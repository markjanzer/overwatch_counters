# Overwatch Counters

Overwatch Counters helps you pick the best heroes to play against an enemy team. When you select your opponents, a list of counters with their counter scores will render below. You can click on the "Sort By Category" button to sort the counters by role. Click on the icon of a counter to display the individual matchups between that counter and every member of the enemy team.

You can create your own matchup data by selecting "Create Matchups". The matchup chart is 22 x 22, each hero belonging to a row and a column. At the intersection of these rows and columns there are numbers that range from -100 to 100. A positive number means that the row hero has an advantage against the column hero, and a negative number means that the column hero has an advantage against the row. All mirror matchups are automatically set to 0 (an even matchup).

The chart starts populated with the matchup data of the page that you came from. You can hit "Clear All Table Data" at the bottom of the page to start fresh.

It is recommended you input data on a computer. Starting on with the first counter (row: Genji, column: McCree), you can hit the up and down arrows to increment the value by 25, or type in numbers manually. Hit tab to move to the next cell. Tab will skip the cells below the diagonal line of mirror matchups, because they will be filled in automatically with the inverse value. This means that if you think Junkrat have a counter score of 75 into Mei, Mei will have a score of -75 into Junkrat.

When you hit the save button, a unique URL will be generated to view a counter calculator with this matchup data.

You can see it live at [www.overwatchcounters.io](http://www.overwatchcounters.io).

### Setting up development environment
Ruby version 2.2.3
Rails version 4.2.5.1

1. Clone the repository
  ```bash
  git clone https://github.com/markjanzer/overwatch_counters.git
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

8. Go to localhost:3000

### License
Overwatch Counters is released under the [MIT License](https://opensource.org/licenses/MIT)