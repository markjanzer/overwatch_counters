class MatchupTablesController < ApplicationController
	def new
    @matchup_table = MatchupTable.new()
    matchups = {}
    MatchupTable.heroes.each do |hero|
      matchups[hero] = {}
      MatchupTable.heroes.each do |opponent|
        matchups[hero][opponent] = 0
      end
    end
    @matchup_table.matchups = matchups
    # @matchup_table.save()
	end
	
	def create
		@matchup_table = MatchupTable.create()
		@matchup_table.create_matchups(params[:matchup_table])
		@url = @matchup_table.set_url

		response = {url: @url}
    render json: response, status: :ok
	end

	private

	def matchup_table_params
		params.require(:matchup_table)
	end
end
