class Api::V1::SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params["username"])
    if (@user && @user.authenticate(params["password"]))

      token = generate_token

      render json: {
        token: token,
        id: @user.id
      }
    else
      render json: {
        errors: "Username or password is invalid."
      }, status: :unauthorized
    end
  end

end
