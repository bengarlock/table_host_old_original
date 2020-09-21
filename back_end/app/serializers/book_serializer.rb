class BookSerializer < ActiveModel::Serializer
  attributes :id, :date, :restaurant_id, :created_at, :updated_at
  has_many :slots
end
