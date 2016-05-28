class OverwatchState < ActiveRecord::Base
  has_many :heroes, dependent: :destroy

  serialize :matchups, Array
  serialize :matchups_showing_counters, Array
  serialize :adjustments_for_heroes, Array

  def initialize_matchups
    self.matchups = Array.new(21){ Array.new(21){ [0,0,0]}}
  end

  def create_matchups_showing_counters
    counters = self.matchups.deep_dup
    counters.each do |hero_arr|
      hero_arr.map! do |matchup_arr|
        if matchup_arr[2] == 0
          0.5
        else
          matchup_arr[1].to_f / matchup_arr[2]
        end
      end
    end
    self.matchups_showing_counters = counters
    normalize_all_hero_matchups
  end

  def determine_counters(arr_of_hero_alpha_ids)
    hero_matchups = arr_of_hero_alpha_ids.map { |alpha_id| self.matchups_showing_counters[alpha_id]}
    counters = OverwatchState.combine_arrays(hero_matchups)
    counters = counters.each_with_index.map do |counter_score, index|
      [counter_score, index]
    end
    counters.sort! { |x,y| y[0]<=>x[0] }
    output = ""
    counters.each do |counter|
      hero_name = Hero.where(alpha_id: counter[1]).first.name
      output += "#{hero_name} :: #{counter[0].round(3)}" + "\n"
    end
    puts output
    ":D"
  end

  def indexed_heroes
    ordered_heroes = self.heroes.sort { |x,y| x.alpha_id<=>y.alpha_id }
    ordered_heroes.each do |hero|
      puts "#{hero.alpha_id} :: #{hero.name}"
    end
    ":D"
  end

  private

  def self.combine_arrays(arr_of_arrs)
    combined_arr = arr_of_arrs.reduce do |sum, arr|
      [sum, arr].transpose.map {|x| x.reduce(:+)}
    end
  end

  def normalize_all_hero_matchups
    self.matchups_showing_counters = self.matchups_showing_counters.each_with_index.map do |hero_matchups, index|
      normalize_hero_matchups(hero_matchups, index)
    end
  end

  def normalize_hero_matchups(hero_matchups, index)
    hero_matchups_without_index = hero_matchups.slice(0, index) + hero_matchups.slice(index + 1, hero_matchups.length)
    distance_from_half = array_mean(hero_matchups_without_index) - 0.5
    # debugger
    adjustments_for_heroes[index] = distance_from_half
    hero_matchups = hero_matchups.each_with_index.map do |matchup, i|
      if i == index
        0.5
      else
        matchup - distance_from_half
      end
    end
    hero_matchups
  end

  def array_mean(array_of_nums)
    sum = array_of_nums.reduce(:+)
    mean = sum.to_f / array_of_nums.length
  end

end
