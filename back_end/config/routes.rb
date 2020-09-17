Rails.application.routes.draw do
  resources :tables
  resources :books
  resources :slots
  resources :reservations
  resources :restaurants
  resources :guests

  get 'date', to: "books#date"
  get 'search', to: "guests#search"

end
