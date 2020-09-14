class Slot < ApplicationRecord
  belongs_to :book
  belongs_to :guest
  has_many :reservations
  has_many :guests, through: :reservations
end
