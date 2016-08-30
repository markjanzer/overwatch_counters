class CreateMatchupTables < ActiveRecord::Migration
  def change
    create_table :matchup_tables do |t|
    	t.text :url
    	t.float :min
    	t.float :max
      t.timestamps null: false
    end
  end
end
