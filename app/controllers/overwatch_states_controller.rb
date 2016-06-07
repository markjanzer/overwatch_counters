class OverwatchStatesController < ApplicationController
	def index
		@overwatch_state = OverwatchState.first
		@ordered_heroes = @overwatch_state.ordered_heroes
	end

	def counters
		@overwatch_state = OverwatchState.first
		@counters = @overwatch_state.counters(params[:opponentAlphaIds])
		render json: @counters
	end
end
