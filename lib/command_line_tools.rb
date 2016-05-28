def o
  OverwatchState.first
end

def hero_key
  {
    "bas" => 0,
    "dva" => 1,
    "gen" => 2,
    "han" => 3,
    "jun" => 4,
    "luc" => 5,
    "mcc" => 6,
    "mei" => 7,
    "mer" => 8,
    "pha" => 9,
    "rea" => 10,
    "rei" => 11,
    "roa" => 12,
    "sol" => 13,
    "sym" => 14,
    "tor" => 15,
    "tra" => 16,
    "wid" => 17,
    "win" => 18,
    "zar" => 19,
    "zen" => 20
  }
end

def c
  hero_hash = hero_key
  hero_names = gets.chomp.split(" ")
  alpha_ids = []
  errors = []
  hero_names.each do |name|
    if hero_hash[name.to_s]
      alpha_ids << hero_hash[name]
    else
      errors << name
    end
  end

  if alpha_ids.empty?
    return "ERRORS:: Did not understand #{errors.join(", ")} :: ERRORS"
  end

  o.determine_counters(alpha_ids)

  if errors.empty?
    return "------------OVERWATCH--COUNTERS------------"
  else
    return "ERRORS:: Did not understand #{errors.join(", ")} :: ERRORS"
  end
end

def i
  o.indexed_heroes
end

def h
  puts "------------OVERWATCH--COUNTERS------------"
  puts "c -- find counter"
  puts "Hit c then enter, then type the first three letters of the hero/heroes you want to counter, all lower case and separated by spaces"
  puts "(luc == Lúcio, mcc == McCree, dva == D.Va)"
  puts "Hit enter again to get counters"
  puts ""
  puts "i -- indexed heroes"
  puts "Returns all heroes with their alpha_ids (ids from alphabetical order)"
  puts ""
  puts "h -- help"
  puts ""
  puts "For more statistical details, you can try o.matchups and o.matchups_showing_counters"
  return "------------OVERWATCH--COUNTERS------------"
end

# require "./lib/command_line_tools"
puts "c -- find counter"
puts "i -- indexed heroes"
puts "h -- help"