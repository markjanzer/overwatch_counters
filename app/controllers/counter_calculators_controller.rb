class CounterCalculatorsController < ApplicationController
	def index
		# @hero_matchups = OverwatchState.last.scaled_matchups_showing_counters
		# # @hero_matchups = Rails.cache.read('hero_matchups')

		# @ordered_heroes = Hero.order('alpha_id')
		# # @ordered_heroes = Rails.cache.read('ordered_heroes')
		matchup_table = MatchupTable.last
		@matchup_object = matchup_table.create_matchup_object
	end

	def show
		matchup_table = MatchupTable.where(url: params[:hash])
		@matchup_object = matchup_table.create_matchup_object
	end
end