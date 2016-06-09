OverwatchState.destroy_all

ows = OverwatchState.create()
ows.initialize_matchups

Hero.create(name: "Bastion", alpha_id:0, image_path: "bastion" )
Hero.create(name: "D.Va", alpha_id:1, image_path: "dva" )
Hero.create(name: "Genji", alpha_id:2, image_path: "genji" )
Hero.create(name: "Hanzo", alpha_id:3, image_path: "hanzo" )
Hero.create(name: "Junkrat", alpha_id:4, image_path: "junkrat" )
Hero.create(name: "Lúcio", alpha_id:5, image_path: "lucio" )
Hero.create(name: "McCree", alpha_id:6, image_path: "mccree" )
Hero.create(name: "Mei", alpha_id:7, image_path: "mei" )
Hero.create(name: "Mercy", alpha_id:8, image_path: "mercy" )
Hero.create(name: "Pharah", alpha_id:9, image_path: "pharah" )
Hero.create(name: "Reaper", alpha_id:10, image_path: "reaper" )
Hero.create(name: "Reinhardt", alpha_id:11, image_path: "reinhardt" )
Hero.create(name: "Roadhog", alpha_id:12, image_path: "roadhog" )
Hero.create(name: "Soldier: 76", alpha_id:13, image_path: "soldier-76" )
Hero.create(name: "Symmetra", alpha_id:14, image_path: "symemtra" )
Hero.create(name: "Torbjörn", alpha_id:15, image_path: "torbjorn" )
Hero.create(name: "Tracer", alpha_id:16, image_path: "tracer" )
Hero.create(name: "Widowmaker", alpha_id:17, image_path: "widowmaker" )
Hero.create(name: "Winston", alpha_id:18, image_path: "winston" )
Hero.create(name: "Zarya", alpha_id:19, image_path: "zarya" )
Hero.create(name: "Zenyatta", alpha_id:20, image_path: "zenyatta" )

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

