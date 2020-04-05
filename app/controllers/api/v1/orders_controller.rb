class Api::V1::OrdersController < ApplicationController
    def index
      orders = Order.includes({order_line_items: :grocery_item}, :user, :destination).where(user_id: current_user.id)

      render json: orders, include: [{order_line_items: { include: :grocery_item }}, :destination]
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

      render json: order, include: [{order_line_items: { include: :grocery_item }}, :destination]
    end

    def update
      if order = Order.find(params[:id])
        order.update!(order_update_params)

        render json: order
      end
    end

    def destroy
    end

    private

    def order_update_params
      params.permit(:status, :destination_id, :delivery_notes, :phone_number)
    end

    def order_params
      params.permit(:status).merge(user_id: current_user.id)
    end
end
