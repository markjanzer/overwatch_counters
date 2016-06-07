OverwatchState.destroy_all

ows = OverwatchState.create()
ows.initialize_matchups

Hero.create(name: "Bastion", alpha_id:0 )
Hero.create(name: "D.Va", alpha_id:1 )
Hero.create(name: "Genji", alpha_id:2 )
Hero.create(name: "Hanzo", alpha_id:3 )
Hero.create(name: "Junkrat", alpha_id:4 )
Hero.create(name: "Lúcio", alpha_id:5 )
Hero.create(name: "McCree", alpha_id:6 )
Hero.create(name: "Mei", alpha_id:7 )
Hero.create(name: "Mercy", alpha_id:8 )
Hero.create(name: "Pharah", alpha_id:9 )
Hero.create(name: "Reaper", alpha_id:10 )
Hero.create(name: "Reinhardt", alpha_id:11 )
Hero.create(name: "Roadhog", alpha_id:12 )
Hero.create(name: "Soldier: 76", alpha_id:13 )
Hero.create(name: "Symmetra", alpha_id:14 )
Hero.create(name: "Torbjörn", alpha_id:15 )
Hero.create(name: "Tracer", alpha_id:16 )
Hero.create(name: "Widowmaker", alpha_id:17 )
Hero.create(name: "Winston", alpha_id:18 )
Hero.create(name: "Zarya", alpha_id:19 )
Hero.create(name: "Zenyatta", alpha_id:20 )

Hero.all.each do |hero|
  ows.heroes << hero
end

agent = Mechanize.new
page = agent.get('http://www.owfire.com/overwatch/counters')

# Visits every hero's counter page
page.links_with(:href => /\/overwatch\/wiki\/heroes\/.*\/counters\z/ ).each_with_index do |link, alpha_id|
  hero = Hero.find_by(alpha_id: alpha_id)
  hero_page = link.click
  strong_against = hero_page.search('div[data-parent=strong] div.desc')
  weak_against = hero_page.search('div[data-parent=weak] div.desc')

  # Iterates through strong against column, and adds + to hero in matchup and - to opponent in matchup
  strong_against.each do |element|
    opponent_name = element.search('h4').text
    opponent_alpha_id = Hero.find_by(name: opponent_name).alpha_id
    points_for_hero = element.search('span[data-action="+"]').children.first.text.to_i
    points_for_opponent = element.search('span[data-action="-"]').children.first.text.to_i
    ows.matchups[alpha_id][opponent_alpha_id][0] += points_for_hero
    ows.matchups[alpha_id][opponent_alpha_id][1] += points_for_opponent
    ows.matchups[alpha_id][opponent_alpha_id][2] += (points_for_hero + points_for_opponent)
  end

  # Iterates through weak against column, and adds - to hero in matchup and + to opponent in matchup
  weak_against.each do |element|
    opponent_name = element.search('h4').text
    opponent_alpha_id = Hero.find_by(name: opponent_name).alpha_id
    points_for_hero = element.search('span[data-action="+"]').children.first.text.to_i
    points_for_opponent = element.search('span[data-action="-"]').children.first.text.to_i
    ows.matchups[alpha_id][opponent_alpha_id][1] += points_for_hero
    ows.matchups[alpha_id][opponent_alpha_id][0] += points_for_opponent
    ows.matchups[alpha_id][opponent_alpha_id][2] += (points_for_hero + points_for_opponent)
  end
end

ows.create_matchups_showing_counters
ows.create_scaled_matchups_showing_counters
ows.save
p ows.matchups
p ows.scaled_matchups_showing_counters

# Tools for use
o = OverwatchState.first

