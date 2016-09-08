class CreateMatchupTables < ActiveRecord::Migration
  def change
    create_table :matchup_tables do |t|
      t.jsonb :matchups
      t.text :url
      t.float :max, default: 2
      t.float :increment_value, default: 1
      t.text :text
      t.text :link
      t.string :author
      t.timestamps null: false
    end
  end
end
