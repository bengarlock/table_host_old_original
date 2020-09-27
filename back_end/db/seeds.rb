require "faker"
require "date"

puts "Clearing old data..."

Guest.destroy_all
Restaurant.destroy_all
Book.destroy_all
Slot.destroy_all
Table.destroy_all

Guest.create(first_name: "Ben", last_name: "Garlock", phone_number: "(646) 241-6885", guest_notes: "Student at Flatiron School")

puts "Seeding Guest Database..."

#blank guest record
blank_guest = Guest.create(first_name: '', last_name: '', phone_number: '', guest_notes: '', root_user: true)

guest_notes = [
    "Likes Expensive Wine",
    "Likes to sit in the back",
    "Friend of the owner",
    "Friend of employee",
    "VIP",
    "Booth Table only",
    "Quiet Table",
    "Likes dirty martini with olive"
]

1000.times do
  Guest.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, phone_number: Faker::PhoneNumber.cell_phone, guest_notes: guest_notes[rand(0...guest_notes.length)])
end

#Generate Restaurant:
puts "Seeding Restaurant..."
restaurant1 = Restaurant.create(name: "Flatiron Restaurant", address: "236 Fifth Ave, New York NY 10001", description: "Welcome to Flatiron Restaurant!")


#Create Future days
today = Date.today
index = 0
times = ["5:00 PM", "5:15 PM","5:30 PM","5:45 PM","6:00 PM","6:15 PM","6:30 PM","6:45 PM",
         "7:00 PM","7:15 PM","7:30 PM","7:45 PM", "8:00 PM","8:15 PM","8:30 PM","8:45 PM",
         "9:00 PM","9:15 PM","9:30 PM","9:45 PM",  "10:00 PM"]


100.times do
  Book.create(date: today + index, restaurant_id: Restaurant.last.id)
  puts("Creating day: " + Book.last.date )
  index += 1

  times_index = 0
  while times_index < times.length do
      2.times do
        Slot.create(time: times[times_index], party_size: 2, book_id: Book.last.id, guest_id: blank_guest.id)
      end

      2.times do
        Slot.create(time: times[times_index], party_size: 4, book_id: Book.last.id, guest_id: blank_guest.id)
      end

      1.times do
        Slot.create(time: times[times_index], party_size: 6, book_id: Book.last.id, guest_id: blank_guest.id)
      end
      times_index += 1
  end
end

#Create past days.
index = 1
100.times do
  Book.create(date: today - index, restaurant_id: Restaurant.last.id)
  puts("Creating day: " + Book.last.date )
  index += 1

  times_index = 0
  while times_index < times.length do
    2.times do
      Slot.create(time: times[times_index], party_size: 2, book_id: Book.last.id, guest_id: blank_guest.id)
    end

    2.times do
      Slot.create(time: times[times_index], party_size: 4, book_id: Book.last.id, guest_id: blank_guest.id)
    end

    1.times do
      Slot.create(time: times[times_index], party_size: 6, book_id: Book.last.id, guest_id: blank_guest.id)
    end
    times_index += 1
  end
end


#create tables
puts "Creating Tables..."

table1 = Table.create(class_name: "two-top-horizontal", position_left:"102px", position_top: "40px", name:"1", restaurant_id: restaurant1.id)
table2 = Table.create(class_name: "two-top-horizontal", position_left:"168px", position_top: "40px", name:"2", restaurant_id: restaurant1.id)
table3 = Table.create(class_name: "two-top-horizontal", position_left:"234px", position_top: "40px", name:"3", restaurant_id: restaurant1.id)
table4 = Table.create(class_name: "two-top-horizontal", position_left:"300px", position_top: "40px", name:"4", restaurant_id: restaurant1.id)
table5 = Table.create(class_name: "two-top-horizontal", position_left:"364px", position_top: "40px", name:"5", restaurant_id: restaurant1.id)
table6 = Table.create(class_name: "two-top-horizontal", position_left:"430px", position_top: "40px", name:"6", restaurant_id: restaurant1.id)

table7 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "120px", name:"7", restaurant_id: restaurant1.id)
table8 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "180px", name:"8", restaurant_id: restaurant1.id)
table9 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "240px", name:"9", restaurant_id: restaurant1.id)
table10 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "300px", name:"10", restaurant_id: restaurant1.id)
table11 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "360px", name:"11", restaurant_id: restaurant1.id)
table12 = Table.create(class_name: "two-top-horizontal", position_left:"40px", position_top: "420px", name:"12", restaurant_id: restaurant1.id)

table14 = Table.create(class_name: "fourTop", position_left:"140px", position_top: "150px", name:"14", restaurant_id: restaurant1.id)
table15 = Table.create(class_name: "fourTop", position_left:"210px", position_top: "150px", name:"15", restaurant_id: restaurant1.id)
table16 = Table.create(class_name: "fourTop", position_left:"280px", position_top: "150px", name:"16", restaurant_id: restaurant1.id)
table17 = Table.create(class_name: "fourTop", position_left:"350px", position_top: "150px", name:"17", restaurant_id: restaurant1.id)
table18 = Table.create(class_name: "fourTop", position_left:"420px", position_top: "150px", name:"18", restaurant_id: restaurant1.id)

table19 = Table.create(class_name: "fourTop", position_left:"140px", position_top: "250px", name:"19", restaurant_id: restaurant1.id)
table20 = Table.create(class_name: "fourTop", position_left:"210px", position_top: "250px", name:"20", restaurant_id: restaurant1.id)
table21 = Table.create(class_name: "fourTop", position_left:"280px", position_top: "250px", name:"21", restaurant_id: restaurant1.id)
table22 = Table.create(class_name: "fourTop", position_left:"350px", position_top: "250px", name:"22", restaurant_id: restaurant1.id)
table23 = Table.create(class_name: "fourTop", position_left:"420px", position_top: "250px", name:"23", restaurant_id: restaurant1.id)

table24 = Table.create(class_name: "fourTop", position_left:"140px", position_top: "350px", name:"24", restaurant_id: restaurant1.id)
table25 = Table.create(class_name: "fourTop", position_left:"210px", position_top: "350px", name:"25", restaurant_id: restaurant1.id)
table26 = Table.create(class_name: "fourTop", position_left:"280px", position_top: "350px", name:"26", restaurant_id: restaurant1.id)
table27 = Table.create(class_name: "fourTop", position_left:"350px", position_top: "350px", name:"27", restaurant_id: restaurant1.id)
table28 = Table.create(class_name: "fourTop", position_left:"420px", position_top: "350px", name:"28", restaurant_id: restaurant1.id)

#creating demo Reservations
puts "Creating Reservations..."

reservation_notes = [
    "Celebrating Birthday",
    "Celebrating Anniversary",
    "10th Wedding Anniversary",
    "Catching a show after dinner",
    "Requested booth",
]

8000.times do
  slot = Slot.all.sample
  guest = Guest.all.sample

  old_id = slot.guest_id

  if slot.booked == false
    if guest.root_user == false
      slot.guest_id = guest.id
      slot.booked = true
      slot.status = "booked"
      slot.reservation_notes = reservation_notes[rand(0...reservation_notes.length)]
      slot.save
      puts "Booking guest id on: " + slot.book.date.to_s + " from " + old_id.to_s + " to " + guest.id.to_s
    end
  end
end

puts "Booking Large Parties..."
1000.times do
  slot = Slot.all.sample
  guest = Guest.all.sample
  old_id = slot.guest_id

  if slot.booked == false
    if guest.root_user == false
      slot.guest_id = guest.id
      slot.booked = true
      slot.party_size = rand(8...12)
      slot.status = "booked"
      slot.reservation_notes = reservation_notes[rand(0...reservation_notes.length)]
      slot.save
      puts "Booking guest id on large party slot: " + slot.book.date.to_s + " from " + old_id.to_s + " to " + guest.id.to_s
    end
  end
end

