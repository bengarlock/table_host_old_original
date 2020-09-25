class GuestSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number, :guest_notes, :root_user
=begin
  has_many :slots
=end
end
