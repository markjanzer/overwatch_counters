class CreateOverwatchStates < ActiveRecord::Migration
  def change
    create_table :overwatch_states do |t|
      t.text :matchups
      t.text :matchups_showing_counters
      t.text :scaled_matchups_showing_counters
      t.float :min_counter_score
      t.float :max_counter_score

      t.timestamps null: false
    end
  end
end
