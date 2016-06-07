class OverwatchStatesController < ApplicationController
	def index
		@overwatch_state = OverwatchState.first
		@ordered_heroes = @overwatch_state.ordered_heroes
	end
end
