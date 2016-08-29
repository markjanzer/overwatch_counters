class CreateMatchupCharts < ActiveRecord::Migration
  def change
    create_table :matchup_charts do |t|
    	t.text :url
    	t.float :min
    	t.float :max
      t.timestamps null: false
    end
  end
end
