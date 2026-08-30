require "test_helper"

class DemoDataSeederTest < ActiveSupport::TestCase
  setup do
    Slot.delete_all
    Book.delete_all
    Table.delete_all
    Guest.delete_all
    Restaurant.delete_all
  end

  test "creates a complete and repeatable demo day" do
    date = Date.new(2026, 8, 30)

    2.times { DemoDataSeeder.call(date: date) }

    restaurant = Restaurant.find_by!(name: DemoDataSeeder::RESTAURANT_NAME)
    book = Book.find_by!(date: date.iso8601, restaurant_id: restaurant.id)

    assert_equal 18, restaurant.tables.count
    assert_equal 13, Guest.count
    assert_equal 1, Book.where(date: date.iso8601, restaurant_id: restaurant.id).count
    assert_equal 63, book.slots.count
    assert_equal 10, book.slots.where(booked: true).count
    assert_equal 53, book.slots.where(booked: false).count
    assert book.slots.where(booked: false).all? { |slot| slot.guest.root_user? }
  end

  test "does not replace an existing booking" do
    date = Date.new(2026, 8, 31)
    DemoDataSeeder.call(date: date)
    book = Book.find_by!(date: date.iso8601)
    slot = book.slots.find_by!(time: "5:15 PM", party_size: 2)
    guest = Guest.create!(first_name: "Existing", last_name: "Guest", phone_number: "(212) 555-0199")
    slot.update!(guest: guest, booked: true, status: "confirmed", reservation_notes: "Keep this booking")

    DemoDataSeeder.call(date: date)

    slot.reload
    assert_equal guest, slot.guest
    assert_equal "confirmed", slot.status
    assert_equal "Keep this booking", slot.reservation_notes
  end

  test "does not reset edited demo records on later navigation" do
    date = Date.new(2026, 9, 2)
    DemoDataSeeder.call(date: date)
    restaurant = Restaurant.find_by!(name: DemoDataSeeder::RESTAURANT_NAME)
    table = restaurant.tables.find_by!(name: "1")
    guest = Guest.find_by!(phone_number: "(212) 555-0101")
    table.update!(status: "seated", reservation_id: 42)
    guest.update!(guest_notes: "Updated by the user")

    DemoDataSeeder.call(date: date)

    assert_equal "seated", table.reload.status
    assert_equal 42, table.reservation_id
    assert_equal "Updated by the user", guest.reload.guest_notes
  end
end
