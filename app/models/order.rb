class Order < ApplicationRecord
    has_many :order_line_items
    belongs_to :destination, class_name: "Address", foreign_key: :destination_id, optional: true
end
