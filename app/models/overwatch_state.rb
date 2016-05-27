class OverwatchState < ActiveRecord::Base
  has_many :heroes, dependent: :destroy

  serialize :matchups, Array
  serialize :matchups_showing_counters, Array

  def initialize_matchups
    self.matchups = Array.new(21){ Array.new(21){ [0,0,0]}}
  end

  def create_matchups_showing_counters
    counters = self.matchups.dup
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
      output += "#{hero_name} :: #{counter[0]}" + "\n"
    end
    puts output
  end

  private

  def self.combine_arrays(arr_of_arrs)
    combined_arr = arr_of_arrs.reduce do |sum, arr|
      [sum, arr].transpose.map {|x| x.reduce(:+)}
    end
  end

end
