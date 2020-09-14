class Slot < ApplicationRecord
  belongs_to :book
  has_many :reservations
  has_many :guests, through: :reservations
end
