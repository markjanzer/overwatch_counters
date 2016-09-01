Rails.application.routes.draw do
  get '/' => 'counter_calculators#index'
  get '/counters' => 'counter_calculators#counters'
  get '/matchup_tables/new' => 'matchup_tables#new'
  put '/matchup_table' => 'matchup_tables#create'
  get '/counters/:hash' => 'counter_calculators#show'
end
 