# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  before_action :set_cart

  def pundit_user
    current_account
  end

  private

  def set_cart
    @cart = Cart.find(session[:cart_id])
  rescue ActiveRecord::RecordNotFound
    @cart = Cart.create
    session[:cart_id] = @cart.id
  end
end
