Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories
      resources :products
      
      get 'categories/index'
      get '/categories/:id', to: 'categories#show'

      get 'products/index'
      get '/products/:id', to: 'products#show'
      resources :carts
      resources :cart_items
    end
  end
  get 'accounts/check_for_account', to: 'accounts#check_for_account'

  devise_for :accounts do
    get '/accounts/sign_out' => 'devise/sessions#destroy'
  end
  resources :accounts
  root "home#index"
  get '/*path' => 'home#index'
end
