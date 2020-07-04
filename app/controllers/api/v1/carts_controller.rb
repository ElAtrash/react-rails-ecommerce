# frozen_string_literal: true

class Api::V1::CartsController < ApplicationController
  before_action :set_cart, only: %i[show edit update destroy]

  def index
    @carts = Cart.all
    render json: @carts
  end

  def show; end

  def new
    @cart = Cart.new
  end

  def edit; end

  def create
    @cart = Cart.new(cart_params)

    if @cart.save
      render :show, status: :created, location: @cart
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  def update
    if @cart.update(cart_params)
      render :show, status: :ok, location: @cart
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @cart.destroy if @cart.id == session[:cart_id]
    session[:cart_id] = nil
    format.json `{ head :no_content }`
  end

  private

  def set_cart
    @cart = Cart.find(params[:id])
  end

  def cart_params
    params.fetch(:cart, {})
  end
end
