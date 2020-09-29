class Restaurant < ApplicationRecord
  has_many :tables
  has_many :books
  has_many :guests
end


def email
  gmail = Gmail.connect("ben.garlock@gmail.com", "chocolate100X")
  gmail.inbox.count(:read)
  gmail.logout
end

