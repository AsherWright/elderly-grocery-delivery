class AddOrdersAssociationToOrderLineItem < ActiveRecord::Migration[6.0]
  def change
    add_column :order_line_items, :order_id, :integer
  end
end
