ows = OverwatchState.create()
ows.initialize_matchups

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

ows.number_of_votes = ows.matchups.flatten.reduce(:+) / 4.0
ows.create_matchups_showing_counters
ows.create_scaled_matchups_showing_counters
ows.save

Rails.cache.write('hero_matchups', OverwatchState.last.scaled_matchups_showing_counters)

