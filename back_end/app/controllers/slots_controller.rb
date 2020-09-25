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
    @slot.update(slot_params)
    render json: @slot
  end

  private

  def slot_params
    params.require(:slot).permit(:time, :book, :party_size, :status, :reservation_notes, :booked, :guest_id)
  end

end
