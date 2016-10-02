class AddVisitsColumnToMatchupTables < ActiveRecord::Migration
  def change
    add_column :matchup_tables, :visits, :integer, default: 0
  end
end
