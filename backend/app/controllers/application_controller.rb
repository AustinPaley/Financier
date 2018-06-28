class ApplicationController < ActionController::API
  def get_secret
    ENV["JWT_SECRET"]
  end

  def get_token
    request.headers["Authorization"]
  end

  def get_decoded_token
    token = get_token()
    begin
    decoded_token = JWT.decode token, get_secret(), true, {algorithm: 'HS256'}
    rescue JWT::DecodeError
      return nil
    end
    decoded_token
  end

  def is_authenticated?
    !!get_decoded_token
  end

  def requires_login
    if !is_authenticated?
      render json: {
        message: "Not Authorized"
      }, status: :unauthorized
    end
  end

  def requires_user_match
    @user = User.find_by(id: params[:user_id])
    if @user.id != get_decoded_token[0]["id"]
      render json: {
        message: "Not authorized to access."
      }, status: :unauthorized
    end
  end

end
