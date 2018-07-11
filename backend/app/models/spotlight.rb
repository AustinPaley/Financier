class Spotlight < ApplicationRecord
  belongs_to :user
  validates :symbol, presence: true
end
