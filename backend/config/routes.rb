Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :patterns
      post '/sessions/', to: 'sessions#create'
      get '/users/:user_id/patterns', to: 'users#user_patterns'
    end
  end


end
