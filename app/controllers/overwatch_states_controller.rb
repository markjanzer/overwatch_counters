class OverwatchStatesController < ApplicationController
	def index
		@overwatch_state = OverwatchState.first
		@heroes = @overwatch_state.heroes
	end
end
