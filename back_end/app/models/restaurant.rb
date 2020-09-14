class Restaurant < ApplicationRecord
  has_many :tables
  has_many :books
  has_many :guests

end
