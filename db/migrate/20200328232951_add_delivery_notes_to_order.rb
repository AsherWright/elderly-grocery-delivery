class AddDeliveryNotesToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :delivery_notes, :text
  end
end
