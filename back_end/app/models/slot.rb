class Slot < ApplicationRecord
  belongs_to :book
  belongs_to :guest
end
