class Api::V1::UsersController < ApplicationController
  before_action :requires_login, only: [:user_patterns]
  before_action :requires_user_match, only: [:user_patterns]

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
    render json: @user.patterns
  end
  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
