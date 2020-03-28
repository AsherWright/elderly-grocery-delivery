class Api::V1::AddressesController < ApplicationController
  def create
    address = Address.create!(address_params)

    if address
      render json: address
    else
      render json: address.errors
    end
  end

  def show
    address = Address.find(params[:id])

    render json: address
  end

  private

  def address_params
    params.permit(:address)
  end
end
