class OverwatchStatesController < ApplicationController
	def index
		@hero_matchups = OverwatchState.last.scaled_matchups_showing_counters
		@ordered_heroes = Hero.order('alpha_id')
	end
end
