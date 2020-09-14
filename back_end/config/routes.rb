Rails.application.routes.draw do
  resources :tables
  resources :books
  resources :slots
  resources :reservations
  resources :restaurants
  resources :guests
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
