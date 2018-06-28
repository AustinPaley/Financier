class CreatePatterns < ActiveRecord::Migration[5.2]
  def change
    create_table :patterns do |t|
      t.integer :user_id
      t.timestamps
    end
  end
end
