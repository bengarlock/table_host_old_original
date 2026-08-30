class SlotsController < ApplicationController

  def index
    @slots = Slot.all
    render json: @slots
  end

  def show
    @slot = Slot.find(params[:id])
    render json: @slot
  end

  def update
    @slot = Slot.find(params[:id])
    if @slot.update(slot_params)
      render json: @slot
    else
      render json: { errors: @slot.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def slot_params
    params.require(:slot).permit(:time, :book, :party_size, :status, :reservation_notes, :booked, :guest_id, tables: [])
  end

end
