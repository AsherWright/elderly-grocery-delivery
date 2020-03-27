class Api::V1::OrdersController < ApplicationController
    def index
    end

    def create
      order = Order.create!(order_params)

      if order
        render json: order
      else
        render json: order.errors
      end
    end

    def show
      order = Order.includes(order_line_items: :grocery_item).find(params[:id])

      render json: order, include: {order_line_items: { include: :grocery_item }}
    end

    def destroy
    end

    private

    def order_params
      params.permit(:order)
    end
end
