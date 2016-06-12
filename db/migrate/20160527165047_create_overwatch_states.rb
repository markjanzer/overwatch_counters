class CreateOverwatchStates < ActiveRecord::Migration
  def change
    create_table :overwatch_states do |t|
      t.text :matchups
      t.text :matchups_showing_counters
      t.text :scaled_matchups_showing_counters
      t.integer :number_of_votes

      t.timestamps null: false
    end
  end
end
