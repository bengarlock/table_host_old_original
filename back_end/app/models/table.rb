class Table < ApplicationRecord
  belongs_to :restaurant

  validates :name, presence: true, uniqueness: { scope: :restaurant_id }
  validates :class_name, inclusion: { in: %w[two-top-horizontal two-top-vertical fourTop] }
end
