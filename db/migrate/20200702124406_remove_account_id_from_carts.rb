class RemoveAccountIdFromCarts < ActiveRecord::Migration[6.0]
  def change
    remove_column :carts, :account_id, :integer
  end
end
