class CartItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  def total_item_price
    product.price * quantity
  end
end
