require "test_helper"

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    Slot.delete_all
    Book.delete_all
    Table.delete_all
    Guest.delete_all
    Restaurant.delete_all
  end

  test "date navigation seeds and returns that day" do
    get books_url, params: { date: "2026-09-01" }

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 1, body.length
    assert_equal "2026-09-01", body.first.fetch("date")
    assert_equal 63, body.first.fetch("slots").length
    assert_equal 10, body.first.fetch("slots").count { |slot| slot.fetch("booked") }
  end

  test "rejects an invalid date" do
    get books_url, params: { date: "September first" }

    assert_response :unprocessable_entity
  end
end
