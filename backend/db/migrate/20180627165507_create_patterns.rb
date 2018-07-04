class CreatePatterns < ActiveRecord::Migration[5.2]
  def change
    create_table :patterns do |t|
      t.integer :user_id
      t.string :symbol
      t.string :open
      t.string :close
      t.string :high
      t.string :low
      t.string :investment_size
      t.integer :days
      t.timestamps
    end
  end
end
