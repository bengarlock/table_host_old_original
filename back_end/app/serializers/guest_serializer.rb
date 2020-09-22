class GuestSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone_number, :guest_notes, :reservations

  def reservations
    ActiveModel::SerializableResource.new(object.slots,  each_serializer: SlotSerializer)
  end

end
