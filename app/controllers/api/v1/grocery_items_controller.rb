class Api::V1::GroceryItemsController < ApplicationController
  def index
    grocery_items = GroceryItem.all.order(created_at: :desc)
    render json: grocery_items
  end

  def create
    grocery_items = if multiple_items?
      params_with_id = grocery_items_params[:items].map { |item_params| item_params.merge(user_id: current_user.id) }
      GroceryItem.create!(params_with_id)
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
    params.permit(:items => [:name, :price])
  end

  def grocery_item_params
    params.require([:name, :price]).merge(user_id: current_user.id)
  end
end
