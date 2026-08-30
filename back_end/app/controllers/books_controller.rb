class BooksController < ApplicationController

  def index
    if params[:date].present?
      date = Date.iso8601(params[:date]).iso8601
      DemoDataSeeder.call(date: date)
      @books = Book.where(date: date).order(:id)
    else
      @books = Book.all.order(:date, :id)
    end

    render json: @books
  rescue ArgumentError
    render json: { error: "date must use YYYY-MM-DD format" }, status: :unprocessable_entity
  end

  def show
    @book = Book.find(params[:id])
    render json: @book
  end

  def date
    @book = Book.search_date(params[:date])
    render json: @book
  end


end
