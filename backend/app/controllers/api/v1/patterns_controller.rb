class Api::V1::PatternsController < ApplicationController

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

  private
  def pattern_params
    params.require(:pattern)
  end
end
