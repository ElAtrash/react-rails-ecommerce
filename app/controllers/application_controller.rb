class ApplicationController < ActionController::Base
  include Pundit

  def pundit_user
    current_account
  end
end
