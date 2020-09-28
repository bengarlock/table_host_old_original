class Guest < ApplicationRecord
  has_many :slots
  has_many :books, through: :slots

  include PgSearch::Model
  multisearchable against: [:first_name, :last_name, :phone_number]


=begin
  pg_search_scope :search_content_for, against: [:first_name, :last_name, :phone_number],
                  using: { tsearch: { any_word: true } }
=end

  def self.search_by(search_term)
    search_results = where("LOWER(first_name) LIKE :search_term
            OR LOWER(last_name) LIKE :search_term
            OR LOWER(phone_number) LIKE :search_term", search_term: "%#{search_term.downcase}%")
    return search_results
  end
end
