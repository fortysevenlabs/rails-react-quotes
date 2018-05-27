Rails.application.routes.draw do
  root to: "pages#home"
  # get 'pages/home'

  # return 'json' formatted response for '/api/*' requests'
  namespace :api, defaults: {format: :json} do
    resources :quotes, only: [:show]
  end
end