class CountersController < ApplicationController
	def show
		matchup_chart = MatchupChart.where(url: params[:hash])
		@matchup_object = matchup_chart.create_matchup_object
	end
end