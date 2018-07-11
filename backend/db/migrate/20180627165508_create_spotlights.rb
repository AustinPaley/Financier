class CreateSpotlights < ActiveRecord::Migration[5.2]
  def change
    create_table :spotlights do |t|
      t.integer :user_id
      t.string :symbol
      t.timestamps
    end
  end
end
