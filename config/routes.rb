Rails.application.routes.draw do
  get '/' => 'counter_calculators#index'
  get '/matchup_tables/new' => 'matchup_tables#new'
  put '/matchup_table' => 'matchup_tables#create'
  get '/:id' => 'counter_calculators#show'
  get '/matchup_tables/:id' => 'matchup_tables#edit'
end
 