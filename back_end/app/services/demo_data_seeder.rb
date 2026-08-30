class DemoDataSeeder
  RESTAURANT_NAME = "TableHost Demo".freeze
  TIMES = [
    "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM",
    "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM",
    "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM", "10:00 PM"
  ].freeze
  PARTY_SIZES = [2, 4, 6].freeze

  GUESTS = [
    ["Alex", "Morgan", "(212) 555-0101", "Prefers a quiet table"],
    ["Jamie", "Rivera", "(212) 555-0102", "Celebrates birthdays here"],
    ["Taylor", "Nguyen", "(212) 555-0103", "Vegetarian menu requested"],
    ["Jordan", "Patel", "(212) 555-0104", "Likes a table near the window"],
    ["Casey", "Williams", "(212) 555-0105", "VIP guest"],
    ["Riley", "Brown", "(212) 555-0106", "Prefers sparkling water"],
    ["Avery", "Kim", "(212) 555-0107", "Anniversary guest"],
    ["Quinn", "Davis", "(212) 555-0108", "Usually arrives early"],
    ["Parker", "Wilson", "(212) 555-0109", "Booth requested"],
    ["Cameron", "Martinez", "(212) 555-0110", "Friend of the restaurant"],
    ["Drew", "Anderson", "(212) 555-0111", "Prefers the back dining room"],
    ["Reese", "Thomas", "(212) 555-0112", "No special requests"]
  ].freeze

  RESERVATIONS = [
    ["5:00 PM", 2, 0, "Celebrating a birthday", "1"],
    ["5:30 PM", 4, 1, "Window table requested", "7"],
    ["6:00 PM", 2, 2, "Vegetarian menu requested", "2"],
    ["6:30 PM", 6, 3, "Family dinner", "13"],
    ["7:00 PM", 4, 4, "VIP reservation", "14"],
    ["7:30 PM", 2, 5, "Anniversary dinner", "3"],
    ["8:00 PM", 6, 6, "Celebrating an anniversary", "15"],
    ["8:30 PM", 4, 7, "Catching a show after dinner", "8"],
    ["9:00 PM", 2, 8, "Booth requested", "4"],
    ["9:30 PM", 4, 9, "Friend of the restaurant", "16"]
  ].freeze

  def self.call(date: Date.current)
    new(date: date).call
  end

  def initialize(date:)
    @date = date.to_date.iso8601
  end

  def call
    ActiveRecord::Base.transaction do
      restaurant = seed_restaurant
      blank_guest = seed_blank_guest
      guests = seed_guests
      seed_tables(restaurant)
      book = restaurant.books.find_or_initialize_by(date: @date)
      seed_reservations_for_book = book.new_record?
      book.save!
      seed_slots(book, blank_guest)
      seed_reservations(book, guests) if seed_reservations_for_book

      {
        restaurant: restaurant,
        book: book,
        tables: restaurant.tables.count,
        slots: book.slots.count,
        reservations: book.slots.where(booked: true).count
      }
    end
  end

  private

  def seed_restaurant
    Restaurant.find_or_initialize_by(name: RESTAURANT_NAME).tap do |restaurant|
      restaurant.address = "236 Fifth Ave, New York, NY 10001" if restaurant.address.blank?
      restaurant.description = "A ready-to-use TableHost demonstration restaurant." if restaurant.description.blank?
      restaurant.save!
    end
  end

  def seed_blank_guest
    Guest.find_or_initialize_by(root_user: true).tap do |guest|
      guest.first_name ||= ""
      guest.last_name ||= ""
      guest.phone_number ||= ""
      guest.guest_notes ||= ""
      guest.save!
    end
  end

  def seed_guests
    GUESTS.map do |first_name, last_name, phone_number, guest_notes|
      Guest.find_or_initialize_by(phone_number: phone_number).tap do |guest|
        if guest.new_record?
          guest.first_name = first_name
          guest.last_name = last_name
          guest.guest_notes = guest_notes
          guest.root_user = false
          guest.save!
        end
      end
    end
  end

  def seed_tables(restaurant)
    table_layout.each do |attributes|
      restaurant.tables.find_or_initialize_by(name: attributes[:name]).tap do |table|
        if table.new_record?
          table.assign_attributes(attributes)
          table.save!
        end
      end
    end
  end

  def seed_slots(book, blank_guest)
    TIMES.product(PARTY_SIZES).each do |time, party_size|
      book.slots.find_or_initialize_by(time: time, party_size: party_size).tap do |slot|
        next unless slot.new_record?

        slot.guest = blank_guest
        slot.booked = false
        slot.status = ""
        slot.reservation_notes = ""
        slot.tables = []
        slot.save!
      end
    end
  end

  def seed_reservations(book, guests)
    RESERVATIONS.each do |time, party_size, guest_index, notes, table_name|
      slot = book.slots.find_by!(time: time, party_size: party_size)
      next if slot.booked?

      slot.update!(
        guest: guests.fetch(guest_index),
        booked: true,
        status: "booked",
        reservation_notes: notes,
        tables: [table_name]
      )
    end
  end

  def table_layout
    (1..18).map do |number|
      column = (number - 1) % 6
      row = (number - 1) / 6
      {
        name: number.to_s,
        class_name: row.zero? ? "two-top-horizontal" : (row == 1 ? "two-top-vertical" : "fourTop"),
        position_left: "#{40 + (column * 72)}px",
        position_top: "#{40 + (row * 130)}px",
        status: "done",
        reservation_id: 0
      }
    end
  end
end
