class Api::V1::SpotlightsController < ApplicationController
  before_action :requires_login, only: [:index, :destroy]

  def index
    user = get_decoded_token[0]["id"]
    @spotlights = Spotlight.all.where(user_id: user)
    render json: @spotlights
  end

  def create
    user = get_decoded_token[0]["id"]
    @spotlight = Spotlight.create(spotlight_params)
    @spotlights = Spotlight.all.where(user_id: user)
    render json: @spotlights
  end

  def show
    @spotlight = Spotlight.find(params[:id])
    render json: @spotlight
  end

  def destroy
    user_id = get_decoded_token[0]["id"]
    @user = User.find_by(id: user_id)
    @spotlight = Spotlight.find(params[:id])
    if @user.id != @spotlight.user_id
      render json: {
        message: "Not authorized to access."
      }, status: :unauthorized
    else
    @spotlight.destroy
    render json: {
      item: @spotlight,
      messages: "Spotlight removed."
    }
    end
  end

  private
  def spotlight_params
    params.require(:spotlight).permit(:user_id, :symbol)
  end
end
