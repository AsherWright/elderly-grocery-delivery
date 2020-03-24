class AddItemsAssociationToOrderLineItem < ActiveRecord::Migration[6.0]
  def change
    add_column :order_line_items, :item_id, :integer
    add_index 'order_line_items', ['item_id'], :name => 'item_id' 
  end
end
