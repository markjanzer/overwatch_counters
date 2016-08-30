class CountersController < ApplicationController
	def show
		matchup_table = MatchupTable.where(url: params[:hash])
		@matchup_object = matchup_table.create_matchup_object
	end
end