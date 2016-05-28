class CreateHeroes < ActiveRecord::Migration
  def change
    create_table :heroes do |t|
      t.string :name
      t.integer :alpha_id
      t.integer :overwatch_state_id

      t.timestamps null: false
    end
  end
end
