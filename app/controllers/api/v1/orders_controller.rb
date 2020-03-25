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
        render json: Order.find(params[:id])
    end

    def destroy
    end

    private

    def order_params
        params.permit(:order)
    end
end
