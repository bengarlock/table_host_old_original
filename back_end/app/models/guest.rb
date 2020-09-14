class Guest < ApplicationRecord
  has_many :reservations
  has_many :slots, through: :reservations
end
