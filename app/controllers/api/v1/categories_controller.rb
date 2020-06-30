class Api::V1::CategoriesController < ApplicationController
  # before_action :authenticate_account!, except:  [ :index, :show ]
  before_action :set_category, only: [:edit, :update, :destroy]

  def index
    categories = Category.all
    render json: categories
  end

  def show
    category = Category.find(params[:id])
    products = category.products
    render json: products
  end

  def new
    category = policy_scope(Category).new
  end

  def edit
  end

  def create
    category = policy_scope(Category).new(category_params)

    if category.save
      render :show, status: :created, location: category 
    else
      render json: category.errors, status: :unprocessable_entity     
    end
  end

  def update
    if category.update(category_params)
      render :show, status: :ok, location: category 
    else  
      render json: category.errors, status: :unprocessable_entity       
    end
  end

  def destroy
    @category.destroy
    render json { head :no_content }
  end

  private
    def set_category
      @category = policy_scope(Category).find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
