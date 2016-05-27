class Hero < ActiveRecord::Base
  belongs_to :overwatch_state

  # def self.reset_matchups
  #   @@matchups = Array.new(21){ Array.new(21){ [0,0,0]}}
  #   self.matchups = @@matchups
  # end
end

