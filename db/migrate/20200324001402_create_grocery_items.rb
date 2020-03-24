class CreateGroceryItems < ActiveRecord::Migration[6.0]
  def change
    create_table :grocery_items do |t|
      t.string :name
      t.string :image
      t.float :price

      t.timestamps
    end
  end
end
