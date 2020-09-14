class TablesController < ApplicationController

  def index
    @tables = Table.all
    render json: @tables
  end

end
