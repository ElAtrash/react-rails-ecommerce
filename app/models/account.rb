class Account < ApplicationRecord
  enum role: [:User, :Manager, :Admin]
  has_many :orders
  has_many :carts
  validates :role, presence: true
  validates :email, presence: true, uniqueness: true
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def admin?
    self.role == 'Admin'
  end

  def manager?
    self.role == 'Manager'
  end

  def user?
    self.role == 'User'
  end
end
