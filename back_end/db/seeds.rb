require "faker"
require "date"

Guest.destroy_all
Restaurant.destroy_all
Book.destroy_all
Slot.destroy_all

Guest.create(first_name: "Ben", last_name: "Garlock", phone_number: "(646) 241-6885", guest_notes: "Student at Flatiron School")

1000.times do
  Guest.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, phone_number: Faker::PhoneNumber.cell_phone, guest_notes: Faker::TvShows::BojackHorseman.tongue_twister)
end


#Generate Restaurant:
Restaurant.create(name: "ilili", address: "236 Fifth Ave, New York NY 10001", description: "Welcome to ilili!
We’re honored to share the cuisine and culture of Lebanon in the heart of New York City. Since 2007, our home in
the Flatiron District has introduced the passion and generosity of the Lebanese table to hundreds of thousands of curious
diners while comforting native Lebanese guests with a celebration of their homeland and values. Owner and Executive Chef
Philippe Massoud expertly crafts a sophisticated blend of modern and traditional Lebanese cuisine drawing influences from
the span of the ancient Silk Road trade routes.")


today = Date.today
index = 0
100.times do
  Book.create(date: today + index, restaurant_id: Restaurant.last.id)
  5.times do
    Slot.create(time: "5:00 PM", party_size: 2, book_id: Book.last.id)
  end
  index += 1
end


