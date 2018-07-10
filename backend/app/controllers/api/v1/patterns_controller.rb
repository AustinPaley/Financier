class Api::V1::PatternsController < ApplicationController
  before_action :requires_login, only: [:index, :destroy]

  def index
      @patterns = Pattern.all
      render json: @patterns
  end

  def create
    @pattern = Pattern.create(pattern_params)
    render json: @pattern
  end

  def show
    @pattern = Pattern.find(params[:id])
    render json: @pattern
  end

  def destroy
    user_id = get_decoded_token[0]["id"]
    @user = User.find_by(id: user_id)
    @pattern = Pattern.find(params[:id])
    if @user.id != @pattern.user_id
      render json: {
        message: "Not authorized to access."
      }, status: :unauthorized
    else
    @pattern.destroy
    render json: {
      item: @pattern,
      messages: "Pattern removed."
    }
    end
  end

  private
  def pattern_params
    params.require(:pattern).permit(:user_id, :close, :open, :high, :low, :symbol, :investment_size, :days)
  end
end
