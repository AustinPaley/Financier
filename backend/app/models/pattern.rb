class Pattern < ApplicationRecord
  belongs_to :user
  validates :investment_size, presence: true
  validates :user_id, presence: true
  validates :symbol, presence: true
end
