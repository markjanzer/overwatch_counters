class CreateOverwatchCounters < ActiveRecord::Migration
  def change
    create_table :overwatch_counters do |t|
    	t.text :url
    	t.float :min
    	t.float :max
      t.timestamps null: false
    end
  end
end
