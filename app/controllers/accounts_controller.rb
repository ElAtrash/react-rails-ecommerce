class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :edit, :update, :destroy]

  def index
    @accounts = policy_scope(Account).all
    render json: @accounts
  end

  def show
    render json: @account
  end

  def check_for_account
    if current_account
      render json: current_account
    else
      render json: {account: nil}
    end
  end

  def new
    @account = Account.new
  end

  def edit
  end

  def create
    @account = Account.new(account_params)

    if @account.save
      render :show, status: :created, location: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def update
    if @account.update(account_params)
      render :show, status: :ok, location: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @account.destroy
    render json { head :no_content }
  end

  private
    def set_account
      @account = policy_scope(Account).find(params[:id])
    end

    def account_params
      params.require(:account).permit(:email, :role)
    end
end