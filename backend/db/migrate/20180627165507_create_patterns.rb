class CreatePatterns < ActiveRecord::Migration[5.2]
  def change
    create_table :patterns do |t|
      t.integer :user_id
      t.string :symbol
      t.integer :open
      t.integer :close
      t.integer :high
      t.integer :low
      t.integer :investment_size
      t.integer :days
      t.timestamps
    end
  end
end
