class SlotsController < ApplicationController

  def index
    @slots = Slot.all
    render json: @slots
  end

end
