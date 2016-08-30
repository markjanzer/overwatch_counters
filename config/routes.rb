Rails.application.routes.draw do
  get '/' => 'overwatch_states#index'
  get '/counters' => 'overwatch_states#counters'
  get '/matchup_tables/new' => 'matchup_tables#new'
  put '/matchup_table' => 'matchup_tables#create'
  get '/counters/:hash' => 'counters#show'
end
 