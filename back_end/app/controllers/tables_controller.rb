class TablesController < ApplicationController

  def index
    @tables = Table.all
    render json: @tables
  end

  def show
    @table = Table.find(params[:id])
    render json: @table
  end

  def update
    @table = Table.find(params[:id])
    @table.update(table_params)
    render json: @table
  end

  private

  def table_params
    params.require(:table).permit(:name, :restaurant_id, :class_name, :position_left, :position_top, :status)
  end

end
