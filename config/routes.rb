Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'delivery', to: 'delivery#index'
  get 'groceries', to: 'groceries#index'
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
