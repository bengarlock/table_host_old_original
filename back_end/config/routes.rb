Rails.application.routes.draw do
  resources :tables
  resources :books
  resources :slots
  resources :restaurants
  resources :guests

  get 'date', to: "books#date"
  get 'search', to: "guests#search"
  get 'email', to: "guests#email"

end
