class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
    include Knock::Authenticable


end
