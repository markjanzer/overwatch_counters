class CreateHeros < ActiveRecord::Migration
  def change
    create_table :heros do |t|
      t.string :name
      t.integer :alpha_id
      t.integer :matchups, array: true, default: Array.new(21, [0,0,0])

      t.timestamps null: false
    end
  end
end
