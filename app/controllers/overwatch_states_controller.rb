class OverwatchStatesController < ApplicationController
	def index
		@hero_matchups = OverwatchState.first.scaled_matchups_showing_counters
		@ordered_heroes = OverwatchState.first.ordered_heroes
	end
end
