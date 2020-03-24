class CreateOrderLineItems < ActiveRecord::Migration[6.0]
  def change
    create_table :order_line_items do |t|
      t.integer :quantity

      t.timestamps
    end
  end
end
