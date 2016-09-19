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

  def edit
    @matchup_table = MatchupTable.where(url: params[:hash])[0]
    puts @matchup_table
  end
	
	def create
		@matchup_table = MatchupTable.create(matchup_table_params)
		@matchup_table.update(url: @matchup_table.set_url)

		response = {url: @matchup_table.url}
    render json: response, status: :ok
	end

	private

	def matchup_table_params
		params.require(:matchup_table).permit(:max, :increment_value, matchups: permit_recursive_params(params[:matchup_table][:matchups]))
	end

  def permit_recursive_params(params)
    params.map do |key, value|
      if value.is_a?(Array)
        { key => [ permit_recursive_params(value.first) ] }
      elsif value.is_a?(Hash) || value.is_a?(ActionController::Parameters)
        { key => permit_recursive_params(value) }
      else
        key
      end
    end
  end

end
