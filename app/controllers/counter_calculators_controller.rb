class CounterCalculatorsController < ApplicationController
	def index
		@matchup_table = MatchupTable.all.where(default: true).first
    @matchup_table.increment!(:visits)
	end

	def show
		@matchup_table = MatchupTable.find(params[:id])
    @matchup_table.increment!(:visits)
	end
end