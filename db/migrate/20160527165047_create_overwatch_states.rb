class CreateOverwatchStates < ActiveRecord::Migration
  def change
    create_table :overwatch_states do |t|
      t.text :matchups
      t.text :matchups_showing_counters

      t.timestamps null: false
    end
  end
end
