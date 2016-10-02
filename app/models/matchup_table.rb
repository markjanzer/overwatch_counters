class MatchupTable < ActiveRecord::Base

  def self.heroes
    ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ]
  end

  def self.new_matchup_table
    matchup_table = self.new()
    matchups = {}
    self.heroes.each do |hero|
      matchups[hero] = {}
      self.heroes.each do |opponent|
        matchups[hero][opponent] = 0
      end
    end
    matchup_table.matchups = matchups
    return matchup_table
  end

  def self.create_average_table(array_of_matchups)
    table_count = array_of_matchups.length
    matchup_table = self.new()
    matchups = {}
    self.heroes.each do |hero|
      matchups[hero] ||= {}
      self.heroes.each do |opponent|
        sum = 0
        array_of_matchups.each do |matchup|
          sum += matchup[hero][opponent].to_f
        end
        matchups[hero][opponent] = sum / table_count.to_f
      end
    end
    matchup_table.matchups = matchups
    return matchup_table
  end

  def self.ids_to_matchups(id_array)
    matchups = []
    id_array.each do |id|
      matchups.push(MatchupTable.find(id).matchups)
    end
    matchups
  end

	# def create_matchups(matchup_table)
	# 	matchup_table.keys.each do |hero|
	# 		matchup_table[hero].keys.each do |opponent|
	# 			Matchup.create(matchup_table_id: self.id, hero: hero, opponent: opponent, score: matchup_table[hero][opponent])
	# 		end
	# 	end
	# end

	# def set_url
	# 	hash = SecureRandom.urlsafe_base64
	# 	self.update(url: hash)
	# 	self.url
	# end

	# def create_matchup_object 
	# 	matchup_object = {}
	# 	self.matchups.each do |matchup|
	# 		matchup_object[matchup.hero] ||= {}
	# 		matchup_object[matchup.hero][matchup.opponent] = matchup.score 
	# 	end
	# 	matchup_object
	# end
end