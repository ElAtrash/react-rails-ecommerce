# frozen_string_literal: true

class Api::V1::CartItemsController < ApplicationController
  before_action :set_cart, only: %i[show edit update destroy]
  before_action :set_cart, only: [:create]

  def index
    @cart_items = CartItem.all
    render json: @cart_items
  end

  def show; end

  def new
    @cart_item = CartItem.new
  end

  def edit; end

  def create
    product = Product.find(params[:product_id])
    @cart_item = Cart.add_product(product)

    if @cart_item.save
      render :show, status: :created, location: @cart_item
    else
      render json: @cart_item.errors, status: :unprocessable_entity
    end
  end

  def update
    if @cart_item.update(cart_item_params)
      render :show, status: :ok, location: @cart_item
    else
      render json: @cart_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @cart = Cart.find(session[:cart_id])
    @cart_item.destroy
    render `json { head :no_content }`
  end

  private

  def set_cart_item
    @cart_item = CartItem.find(params[:id])
  end

  def cart_item_params
    params.require(:cart_item).permit(:quantity, :cart_id, :product_id)
  end
end
