class Api::V1::OrderLineItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
    end

    def create
        order_line_item = OrderLineItem.create!(order_line_item_params)

        if order_line_item
          render json: order_line_item
        else
          render json: order_line_item.errors
        end
    end

    def show
        render json: OrderLineItem.find(params[:id])
    end

    def destroy
    end

    private

    def order_line_item_params
        params.permit(:quantity, :order, :grocery_item)
    end
end
