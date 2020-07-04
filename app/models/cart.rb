# frozen_string_literal: true

class Cart < ApplicationRecord
  has_many :cart_items, dependent: :destroy

  def total_price
    cart_items.to_a.sum(&:total_item_price)
  end

  def add_product(product)
    current_item = cart_items.find_by(product_id: product.id)

    if current_item
      current_item.increment(:quantity)
    else
      current_item = cart_items.build(product_id: product.id)
    end
    current_item
  end
end
