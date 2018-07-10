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
    @pattern = Pattern.find(params[:id])
    @pattern.destroy
    render json: {
      item: @pattern,
      messages: "Pattern removed."
    }
  end

  private
  def pattern_params
    params.require(:pattern).permit(:user_id, :close, :open, :high, :low, :symbol, :investment_size, :days)
  end
end
