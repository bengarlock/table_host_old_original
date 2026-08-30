class TablesController < ApplicationController
  ACTIVE_STATUSES = %w[seated appetizer entree dessert check_dropped paid].freeze

  def index
    @tables = Table.order(:id)
    @tables = @tables.where(restaurant_id: params[:restaurant_id]) if params[:restaurant_id].present?
    render json: @tables
  end

  def show
    @table = Table.find(params[:id])
    render json: @table
  end

  def create
    @table = Table.new(table_params)
    @table.status = "done"
    @table.reservation_id = 0

    if @table.save
      render json: @table, status: :created
    else
      render json: { errors: @table.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @table = Table.find(params[:id])
    requested_status = table_params[:status]
    requested_reservation_id = table_params[:reservation_id].to_i if table_params.key?(:reservation_id)

    Table.transaction do
      @table.lock!

      if requested_status == "done"
        clear_table
      elsif requested_reservation_id&.positive?
        seat_reservation(requested_reservation_id, requested_status || "seated")
      elsif @table.reservation_id.positive? && ACTIVE_STATUSES.include?(requested_status)
        update_service_status(requested_status)
      else
        @table.update!(table_params)
      end
    end

    render json: @table
  rescue ActiveRecord::RecordInvalid => error
    render json: { errors: error.record.errors.full_messages }, status: :unprocessable_entity
  rescue ActionController::BadRequest => error
    render json: { error: error.message }, status: :unprocessable_entity
  end

  private

  def seat_reservation(reservation_id, status)
    raise ActionController::BadRequest, "Invalid table status" unless ACTIVE_STATUSES.include?(status)

    reservation = Slot.lock.find(reservation_id)
    raise ActionController::BadRequest, "Only booked reservations can be seated" unless reservation.booked?
    if @table.reservation_id.positive? && @table.reservation_id != reservation.id
      raise ActionController::BadRequest, "Table #{@table.name} is already occupied"
    end

    @table.update!(status: status, reservation_id: reservation.id)
    reservation.update!(status: status, tables: (Array(reservation.tables) | [@table.name]))
  end

  def update_service_status(status)
    raise ActionController::BadRequest, "Invalid table status" unless ACTIVE_STATUSES.include?(status)

    reservation = Slot.lock.find(@table.reservation_id)
    @table.update!(status: status)
    reservation.update!(status: status)
  end

  def clear_table
    reservation = Slot.lock.find_by(id: @table.reservation_id)
    reservation.update!(status: "done") if reservation
    @table.update!(status: "done", reservation_id: 0)
  end

  def table_params
    params.require(:table).permit(:name, :restaurant_id, :class_name, :position_left, :position_top, :status, :reservation_id)
  end

end
