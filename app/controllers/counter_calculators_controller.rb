class CounterCalculatorsController < ApplicationController
	def index
		@matchup_table = MatchupTable.all.where(default: true).first
    @matchup_table.increment!(:visits)
	end

	def show
		@matchup_table = MatchupTable.find_by_url(params[:hash])
    @matchup_table.increment!(:visits)
	end
end