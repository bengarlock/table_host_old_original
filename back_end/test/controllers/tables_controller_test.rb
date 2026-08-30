require "test_helper"

class TablesControllerTest < ActionDispatch::IntegrationTest
  setup do
    Slot.delete_all
    Book.delete_all
    Table.delete_all
    Guest.delete_all
    Restaurant.delete_all

    seeded = DemoDataSeeder.call(date: Date.new(2026, 8, 30))
    @restaurant = seeded.fetch(:restaurant)
    @book = seeded.fetch(:book)
    @table = @restaurant.tables.find_by!(name: "1")
    @reservation = @book.slots.where(booked: true).first
  end

  test "creates a table in the restaurant floor plan" do
    assert_difference("Table.count", 1) do
      post tables_url, params: {
        table: {
          name: "19",
          restaurant_id: @restaurant.id,
          class_name: "fourTop",
          position_left: "40px",
          position_top: "430px"
        }
      }, as: :json
    end

    assert_response :created
    assert_equal "done", JSON.parse(response.body).fetch("status")
  end

  test "seats a reservation and keeps its table assignment in sync" do
    patch table_url(@table), params: {
      table: { status: "seated", reservation_id: @reservation.id }
    }, as: :json

    assert_response :success
    assert_equal "seated", @table.reload.status
    assert_equal @reservation.id, @table.reservation_id
    assert_equal "seated", @reservation.reload.status
    assert_includes @reservation.tables, @table.name
  end

  test "updates service status on the table and reservation together" do
    @table.update!(status: "seated", reservation_id: @reservation.id)
    @reservation.update!(status: "seated", tables: [@table.name])

    patch table_url(@table), params: { table: { status: "entree" } }, as: :json

    assert_response :success
    assert_equal "entree", @table.reload.status
    assert_equal "entree", @reservation.reload.status
  end

  test "marking done clears the table and completes the reservation" do
    @table.update!(status: "paid", reservation_id: @reservation.id)
    @reservation.update!(status: "paid", tables: [@table.name])

    patch table_url(@table), params: { table: { status: "done" } }, as: :json

    assert_response :success
    assert_equal "done", @table.reload.status
    assert_equal 0, @table.reservation_id
    assert_equal "done", @reservation.reload.status
    assert_equal [@table.name], @reservation.tables
  end

  test "does not replace a party at an occupied table" do
    other_reservation = @book.slots.where(booked: true).where.not(id: @reservation.id).first
    @table.update!(status: "seated", reservation_id: @reservation.id)

    patch table_url(@table), params: {
      table: { status: "seated", reservation_id: other_reservation.id }
    }, as: :json

    assert_response :unprocessable_entity
    assert_equal @reservation.id, @table.reload.reservation_id
    assert_equal "booked", other_reservation.reload.status
  end
end
