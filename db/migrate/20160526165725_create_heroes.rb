class CreateHeroes < ActiveRecord::Migration
  def change
    create_table :heroes do |t|
      t.integer :overwatch_state_id
      t.integer :alpha_id
      t.string :name
      t.string :image_path

      t.timestamps null: false
    end
  end
end
