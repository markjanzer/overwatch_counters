class MatchupChart < ActiveRecord::Base
	has_many :matchups

	def create_matchups(matchup_chart)
		matchup_chart.keys.each do |hero|
			matchup_chart[hero].keys.each do |opponent|
				Matchup.create(matchup_chart_id: self.id, hero: hero, opponent: opponent, score: matchup_chart[hero][opponent])
			end
		end
	end

	def set_url
		hash = SecureRandom.urlsafe_base64
		self.update(url: hash)
		self.url
	end

	def create_matchup_object 
		matchup_object = {}
		self.matchups.each do |matchup|
			matchup_object[matchup.hero] ||= {}
			matchup_object[matchup.hero][matchup.opponent] = matchup.score 
		end
		matchup_object
	end
end