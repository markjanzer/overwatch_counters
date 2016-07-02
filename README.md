# overwatch_counters

Ruby version 2.2.3
Rails version 4.2.5.1

### Setting up development environment

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

  **Note:** Will not work if ruby version is not 2.3.1

  If using rbenv:
  ```bash
  rbenv local 2.3.1
  ```

  If using rvm:

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

8. Win games