class OverwatchState < ActiveRecord::Base
  has_many :heroes, dependent: :destroy

  serialize :matchups, Array
  serialize :matchups_showing_counters, Array

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

  def counters(arr_of_hero_alpha_ids)
    hero_matchups = arr_of_hero_alpha_ids.map { |alpha_id| self.matchups_showing_counters[alpha_id]}
    counters = OverwatchState.combine_arrays(hero_matchups)
    counters = counters.each_with_index.map do |counter_score, index|
      [index, counter_score]
    end
    counters.sort! { |x,y| y[1]<=>x[1] }
  end


  def ordered_heroes
    ordered_heroes = self.heroes.sort { |x,y| x.alpha_id<=>y.alpha_id }
  end

  # xi = x index
  # yi = y index
  private

  def normalize_all_hero_matchups
    while !hero_matchups_are_averaged?
      normalize_all_hero_matchups_vertically
      normalize_all_hero_matchups_horizontally
    end
  end

  def normalize_all_hero_matchups_horizontally
    self.matchups_showing_counters.each_with_index do |matchup, yi|
      self.matchups_showing_counters[yi] = normalize_hero_matchups_horizontally(yi)
    end
  end

  def normalize_all_hero_matchups_vertically
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
    normalize_all_hero_matchups_horizontally
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
  end

  def normalize_hero_matchups_horizontally(yi)
    hero_matchups = self.matchups_showing_counters[yi]
    hero_matchups[yi] = nil
    distance_from_half = array_mean(hero_matchups) - 0.50000000
    hero_matchups = hero_matchups.each_with_index.map do |matchup, i|
      if i == yi
        0.5
      else
        matchup - distance_from_half
      end
    end
    hero_matchups
  end

  def hero_matchups_are_averaged?
    hero_matchups_vertically_average? && hero_matchups_horizontally_average?
  end

  def hero_matchups_horizontally_average?
    horizontally_average = true
    self.matchups_showing_counters.each_with_index do |matchup, yi|
      p "#{yi} :: #{array_mean(matchup).round(3)}"
      if array_mean(matchup).round(2) != 0.500
        horizontally_average = false
      end
    end
    horizontally_average
  end

  def hero_matchups_vertically_average?
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
    bool = hero_matchups_horizontally_average?
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
    bool
  end

  # Get mean of array. Skip nil
  def array_mean(array_of_nums)
    nil_counter = 0
    sum = array_of_nums.reduce(0) do |sum, num|
      if num != nil
        sum + num
      else
        nil_counter += 1
        sum
      end
    end
    mean = sum.to_f / (array_of_nums.length - nil_counter)
  end

  def self.combine_arrays(arr_of_arrs)
    combined_arr = arr_of_arrs.reduce do |sum, arr|
      [sum, arr].transpose.map {|x| x.reduce(:+)}
    end
  end
end
