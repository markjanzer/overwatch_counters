class MatchupTablesController < ApplicationController
	def new
    @matchup_table = MatchupTable.new_matchup_table
	end

  def edit
    @matchup_table = MatchupTable.find(params[:id])
  end
	
	def create
    if params[:matchup_table][:matchups] == MatchupTable.find(params[:matchup_table][:originalId]).matchups
      head 406
    else
  		@matchup_table = MatchupTable.create(matchup_table_params)
  		response = {id: @matchup_table.id}
      render json: response, status: :ok
    end
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
