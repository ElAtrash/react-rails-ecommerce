class Product < ApplicationRecord
  belongs_to :category
  has_many :cart_items

  validates :title, :description, :image_url, :price, presence: true

  scope :filter_by_title, -> (title) { where("title like ?", "#{title}%")}
end
