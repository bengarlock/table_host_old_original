class Guest < ApplicationRecord
  has_many :slots
  has_many :books, through: :slots

  include PgSearch::Model
  multisearchable against: [:first_name, :last_name, :phone_number]


  def self.search_by(search_term)
    results = PgSearch.multisearch(search_term)
    return results
  end
end
