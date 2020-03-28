class AddUserIdToGroceryItems < ActiveRecord::Migration[6.0]
  def change
    add_column :grocery_items, :user_id, :string
  end
end
