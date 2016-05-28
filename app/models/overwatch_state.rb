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
    # normalize_all_hero_matchups
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

  # xi = x index
  # yi = y index

  def hero_matchups_horizontally_average?
    horizontally_average = true
    self.matchups_showing_counters.each_with_index do |matchup, yi|
      p "#{yi} :: #{array_mean(matchup).round(3)}"
      if array_mean(matchup).round(1) != 0.500
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

  def normalize_all_hero_matchups_horizontally
    self.matchups_showing_counters.each_with_index do |matchup, yi|
      # p "BEFORE"
      # p matchups_showing_counters[yi]
      self.matchups_showing_counters[yi] = normalize_hero_matchups_horizontally(yi)
      # p "AFTER"
      # p matchups_showing_counters[yi]
    end
  end

  def normalize_hero_matchups_horizontally(yi)
    hero_matchups = self.matchups_showing_counters[yi]
    hero_matchups[yi] = nil
    distance_from_half = array_mean(hero_matchups) - 0.50000000
    # adjustments_for_heroes[index] = distance_from_half
    hero_matchups = hero_matchups.each_with_index.map do |matchup, i|
      if i == yi
        0.5
      else
        matchup - distance_from_half
      end
    end
    hero_matchups
  end

  def normalize_all_hero_matchups_vertically
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
    normalize_all_hero_matchups_horizontally
    self.matchups_showing_counters = self.matchups_showing_counters.transpose
  end

  def normalize_all_hero_matchups
    # while !hero_matchups_are_averaged?
    normalize_all_hero_matchups_vertically
    normalize_all_hero_matchups_horizontally
    # end
    p hero_matchups_vertically_average?
    p hero_matchups_horizontally_average?
  end

  # private

  def self.combine_arrays(arr_of_arrs)
    combined_arr = arr_of_arrs.reduce do |sum, arr|
      [sum, arr].transpose.map {|x| x.reduce(:+)}
    end
  end

  # Get mean of array. Skip nil
  def array_mean(array_of_nums)
    sum = array_of_nums.reduce(0) do |sum, num|
      if num != nil
        return sum + num
      else
        return sum
      end
    end
    mean = sum.to_f / array_of_nums.length
  end

  def hero_matchups_are_averaged?
    hero_matchups_vertically_average? && hero_matchups_horizontally_average?
  end


  # def normalize_all_hero_matchups_vertically
  #   self.matchups_showing_counters[0].each_with_index do |matchup, xi|
  #     normalize_hero_matchups_vertically(xi)
  #   end
  # end

  # def normalize_hero_matchups_vertically(xi)
  #   # Scale matchups_showing_counters vertically and add to an array from which we find the mean
  #   hero_matchups_without_index = []
  #   self.matchups_showing_counters.each_with_index do |matchup, yi|
  #     if yi == xi
  #       # made nil instead of 0.5 so it doesn't confound mean calculation
  #       hero_matchups_without_index << nil
  #     else
  #       hero_matchups_without_index << self.matchups_showing_counters[yi][xi]
  #     end
  #   end
  #   distance_from_half = array_mean(hero_matchups_without_index) - 0.50000000
  #   self.matchups_showing_counters.each_with_index do |matchup, yi|
  #     if yi == xi
  #       self.matchups_showing_counters[yi][xi] = 0.5
  #     else
  #       self.matchups_showing_counters[yi][xi] = (hero_matchups_without_index[yi] - distance_from_half)
  #     end
  #   end
  # end

  # def hero_matchups_vertically_average?
  #   vertically_average = true
  #   # iterate through the x indices of matchups_showing_counters, and for each of these, iterate vertically, grabbing each element of that x index from each array and add it to vertical_matchup. Then check these vertical_matchups for their average
  #   self.matchups_showing_counters[0].each_with_index do |m, xi|
  #     vertical_matchup = []
  #     self.matchups_showing_counters.each do |matchup|
  #       vertical_matchup << matchup[xi]
  #     end
  #     p "#{xi} :: #{array_mean(vertical_matchup).round(3)}"
  #     if array_mean(vertical_matchup).round(1) != 0.500
  #       vertically_average = false
  #     end
  #   end
  #   vertically_average
  # end
end
