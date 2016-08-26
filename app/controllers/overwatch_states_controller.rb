class OverwatchStatesController < ApplicationController
	def index
		# @hero_matchups = OverwatchState.last.scaled_matchups_showing_counters
		@hero_matchups = Rails.cache.read('hero_matchups')

		# @ordered_heroes = Hero.order('alpha_id')
		@ordered_heroes = Rails.cache.read('ordered_heroes')
	end

	def new
	end
end
