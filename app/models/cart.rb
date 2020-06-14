class Cart < ApplicationRecord
  belongs_to :account
  has_many :cart_items

  def total_price
    cart_items.to_a.sum { |item| item.total_item_price }
  end
end
