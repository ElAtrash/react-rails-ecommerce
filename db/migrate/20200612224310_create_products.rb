class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.decimal :price, precision: 5, scale: 2
      t.integer :quantity, default: 1
      t.integer :category_id

      t.timestamps
    end
  end
end
