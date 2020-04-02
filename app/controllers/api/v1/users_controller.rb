class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, :only => [:show]

  def show
    render json: current_user
  end
end
