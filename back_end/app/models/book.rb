class Book < ApplicationRecord
  has_many :slots
  has_many :reservations, through: :slots


  include PgSearch
  pg_search_scope :search_content_for, against: [:date],
                  using: { tsearch: { any_word: false } }


  def self.search_date(date)
    where("date LIKE :search_date", search_date: "%#{date}%")
  end



end
