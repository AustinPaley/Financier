class Api::V1::SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params["username"])
    if (@user && user.authenticate(params["password"]))
      render json: {
        username: @user.username,
        password: @user.id
      }
    else
      render json: {
        errors: "Username or password is invalid."
      }, status: :unauthorized
    end
  end

end
