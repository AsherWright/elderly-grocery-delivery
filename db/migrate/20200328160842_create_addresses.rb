class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :name, null: false
      t.string :address_line, null: false
      t.string :unit_number
      t.string :city, null: false
      t.string :province, null: false
      t.string :country, null: false
      t.string :postal_code, null: false

      t.timestamps
    end
  end
end
