class Api::V1::GroceryItemsController < ApplicationController
  def index
    grocery_items = GroceryItem.all.order(created_at: :desc)
    render json: grocery_items
  end

  def create
    grocery_items = if multiple_items?
      GroceryItem.create!(grocery_items_params[:items])
    else
      GroceryItem.create!(grocery_item_params)
    end

    if grocery_items
      render json: grocery_items
    else
      render json: grocery_items.errors
    end
  end

  def show
  end

  def destroy
  end

  private

  def multiple_items?
    !!params[:items]
  end

  def grocery_items_params
    params.permit(:items => [:name, :price, :user_id])
  end

  def grocery_item_params
    params.require([:name, :price, :user_id])
  end
end
