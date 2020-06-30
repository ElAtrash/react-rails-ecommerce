class Api::V1::ProductsController < ApplicationController
  # before_action :authenticate_account!, except:  [ :index, :show ]
  before_action :set_product, only: [:edit, :update, :destroy]

  def index
    products = Product.all
    filtering_params(params).each do |key, value|
      products = products.public_send("filter_by_#{key}", value) if value.present?
    end
    render json: products
  end

  def show
    product = Product.find(params[:id])
    render json: product
  end

  def new
    product = policy_scope(Product).new
  end

  def edit
    policy_scope(Product)
  end

  def create
    product = policy_scope(Product).new(product_params)

    if product.save
      render :show, status: :created, location: product
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def update
    if product.update(product_params)
      render :show, status: :ok, location: product
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    product.destroy
    render json { head :no_content }
  end

  private
    def set_product
      @product = policy_scope(Product).find(params[:id])
    end

    def filtering_params(params)
      params.slice(:title)
    end

    def product_params
      params.permit(:title, :description, :image_url, :price, :quantity)
    end
end
