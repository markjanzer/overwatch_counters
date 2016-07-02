# Overwatch Counters

Overwatch Counters helps you pick the best heroes to play against an enemy team. When you select your opponents, a list of counters with their counter score will render below. Click on the icon of a counter for the individual matchups between that counter and every member of the enemy team.

All the data is scraped from [OverwatchFire](http://www.owfire.com/overwatch/counters). Votes for each matchup are added and then numbers are normalized so that every hero has a 50% winrate, and counter scores render on a scale from -100 to 100.

You can see it live at [www.overwatchcounters.io](http://www.overwatchcounters.io).

### Setting up development environment
Ruby version 2.2.3
Rails version 4.2.5.1

1. Clone the repository
  ```bash
  https://github.com/markjanzer/overwatch_counters.git
  ```

2. Navigate to the overwatch_counters directory
  ```bash
  cd overwatch_counters
  ```

3. Install required gems 
  ```bash
  bundle install
  ```

4. Create the database
  ```bash
  rake db:create
  ```

5. Migrate the database
  ```bash
  rake db:migrate
  ```

6. Seed the database with data (this might take a while, it scrapes the web)
  ```bash
  rake db:seed
  ```

7. Start your server
  ```bash
  rails s
  ```

### License
Overwatch Counters is released under the [MIT License](https://opensource.org/licenses/MIT)