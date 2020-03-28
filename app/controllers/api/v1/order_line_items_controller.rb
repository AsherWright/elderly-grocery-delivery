class Api::V1::OrderLineItemsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
  end

  def create
    order_line_items = if multiple_items?
      OrderLineItem.create!(order_line_items_params[:items])
    else
      OrderLineItem.create!(order_line_item_params)
    end

    if order_line_items
      render json: order_line_items
    else
      render json: order_line_items.errors
    end
  end

  def show
      render json: OrderLineItem.find(params[:id])
  end

  def destroy
  end

  private

  def multiple_items?
    !!params[:items]
  end

  def order_line_items_params
    params.permit(:items => [:quantity, :order_id, :grocery_item_id])
  end

  def order_line_item_params
    params.require([:quantity, :grocery_item_id, :order_id])
  end
end
