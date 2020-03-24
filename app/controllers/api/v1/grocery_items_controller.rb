class Api::V1::GroceryItemsController < ApplicationController
  def index
    grocery_items = GroceryItem.all.order(created_at: :desc)
    render json: grocery_items
  end

  def create
  end

  def show
  end

  def destroy
  end
end
