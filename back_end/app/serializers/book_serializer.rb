class BookSerializer < ActiveModel::Serializer
  attributes :id, :date, :restaurant_id, :created_at, :updated_at

  has_many :slots
  has_many :guests, through: :slots
end
