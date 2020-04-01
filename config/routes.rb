Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'grocery_items/index'
      post 'grocery_items/create'
      get 'grocery_items/show/:id', to: 'grocery_items#show'
      delete 'grocery_items/destroy/:id', to: 'grocery_items#destroy'
      post 'order_line_items/create'
      get 'order_line_items/show/:id', to: 'order_line_items#show'
      get 'orders/index'
      post 'orders/create'
      post 'orders/update'
      get 'orders/show/:id', to: 'orders#show'
      post 'addresses/create'
      get 'addresses/show/:id', to: 'addresses#show'
    end
  end

  root 'homepage#index'
  get '*path', to: 'homepage#index'
  devise_for :users, controllers: { registrations: 'api/v1/registrations', sessions: 'api/v1/sessions' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
