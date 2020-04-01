class AddUserIdToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :user_id, :string, null: false
  end
end
