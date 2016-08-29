Rails.application.routes.draw do
  get '/' => 'overwatch_states#index'
  get '/counters' => 'overwatch_states#counters'
  get '/matchup_charts/new' => 'matchup_charts#new'
  put '/matchup_chart' => 'matchup_charts#create'
end
 