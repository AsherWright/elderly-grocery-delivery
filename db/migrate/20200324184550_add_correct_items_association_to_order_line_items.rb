class AddCorrectItemsAssociationToOrderLineItems < ActiveRecord::Migration[6.0]
  def change
    add_column :order_line_items, :grocery_item_id, :integer, null: false
    remove_column :order_line_items, :item_id, :integer
  end
end
