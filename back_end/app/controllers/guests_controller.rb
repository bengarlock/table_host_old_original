class GuestsController < ApplicationController

  def index
    @guests = Guest.all
    render json: @guests
  end

  def show
    @guest = Guest.find(params[:id])
    render json: @guest
  end

  def update
    @guest = Guest.find(params[:id])
    puts "root_user status = " + @guest.root_user.to_s

    if @guest.root_user == false
      puts "guest okay to patch"
      @guest.update(guest_params)
      render json: @guest
    else
      puts "ERROR!! attempt made to change root user!"
      render :json => { :errors => "ERROR! Changes to root user are not allowed" }
    end
  end

  def search
    search_term = params[:q]
    @results = PgSearch.multisearch(search_term).limit(10)
    @guests = []
    @results.each do |item|
      id = item.searchable_id
      puts id
      @guest = Guest.find(id)
      @guests.push(@guest)
    end
    render json: @guests
  end

  private

  def guest_params
    params.require(:guest).permit(:first_name, :last_name, :status, :phone_number, :guest_notes)
  end

end
