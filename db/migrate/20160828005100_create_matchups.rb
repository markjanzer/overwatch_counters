class CreateMatchups < ActiveRecord::Migration
  def change
    create_table :matchups do |t|
    	t.integer :matchup_chart_id
    	t.string :hero
    	t.string :opponent
    	t.float :score
    	t.timestamps null: false
    end
  end
end
