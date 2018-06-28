class Api::V1::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)
    if (@user.save)

      payload={
        username: @user.username,
        id: @user.id
      }

      token = JWT.encode payload, ENV["JWT_SECRET"], 'HS256'

      render json: {
        token: token
      }
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end

  def user_patterns
    @user = User.find_by(id: params[:user_id])
    render json: @user.patterns
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
