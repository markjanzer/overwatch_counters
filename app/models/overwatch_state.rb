class OverwatchState < ActiveRecord::Base
  has_many :heroes, dependent: :destroy

  serialize :matchups, Array

  def initialize_matchups
    self.matchups = Array.new(21){ Array.new(21){ [0,0,0]}}
  end
end
