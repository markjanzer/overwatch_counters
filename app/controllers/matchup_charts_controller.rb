class MatchupChartsController < ApplicationController
	def new
	end
	
	def create
		@matchup_chart = MatchupChart.create()
		@matchup_chart.create_matchups(params[:matchup_chart])
		@url = @matchup_chart.set_url

		response = {url: @url}
    render json: response, status: :ok
	end

	private

	def matchup_chart_params
		params.require(:matchup_chart)
	end
end
