class GuestSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number, :guest_notes
  has_many :slots
end
