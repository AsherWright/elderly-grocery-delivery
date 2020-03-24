Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'grocery_items/index'
      post 'grocery_items/create'
      get 'grocery_items/show/:id', to: 'grocery_items#show'
      delete 'grocery_items/destroy/:id', to: 'grocery_items#destroy'
    end
  end
  get 'hello_world', to: 'hello_world#index'
  get 'delivery', to: 'delivery#index'
  get 'groceries', to: 'groceries#index'
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
