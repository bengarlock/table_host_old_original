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


#Create Future days
today = Date.today
index = 0
times = ["5:00 PM", "5:15 PM","5:30 PM","5:45 PM","6:00 PM","6:15 PM","6:30 PM","6:45 PM",
         "7:00 PM","7:15 PM","7:30 PM","7:45 PM", "8:00 PM","8:15 PM","8:30 PM","8:45 PM",
         "9:00 PM","9:15 PM","9:30 PM","9:45 PM",  "10:00 PM","10:15 PM","10:30 PM","10:45 PM",]


100.times do
  Book.create(date: today + index, restaurant_id: Restaurant.last.id)
  puts("Creating day: " + Book.last.date )
  index += 1

  times_index = 0

  while times_index < times.length do
      2.times do
        Slot.create(time: times[times_index], party_size: 2, book_id: Book.last.id)
      end

      2.times do
        Slot.create(time: times[times_index], party_size: 4, book_id: Book.last.id)
      end

      1.times do
        Slot.create(time: times[times_index], party_size: 6, book_id: Book.last.id)
      end
      times_index += 1
  end

end
