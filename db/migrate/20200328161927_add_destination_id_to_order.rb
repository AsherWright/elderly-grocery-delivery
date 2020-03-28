class AddDestinationIdToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :destination_id, :string
  end
end
