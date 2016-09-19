Rails.application.routes.draw do
  get '/' => 'counter_calculators#index'
  get '/matchup_tables/new' => 'matchup_tables#new'
  get '/matchup_tables/:hash' => 'matchup_tables#edit'
  put '/matchup_table' => 'matchup_tables#create'
  get '/counters/:hash' => 'counter_calculators#show'
end
 