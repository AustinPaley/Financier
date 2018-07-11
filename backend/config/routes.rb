Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :patterns
      resources :sessions
      resources :spotlights
      get '/users/:user_id/patterns', to: 'users#user_patterns'
    end
  end


end
