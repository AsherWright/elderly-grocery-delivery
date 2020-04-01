class Order < ApplicationRecord
    has_many :order_line_items
    belongs_to :destination, class_name: "Address", foreign_key: :destination_id, optional: true
    belongs_to :user

    enum status: {unconfirmed: 0, confirmed: 1, assigned: 2, being_delivered: 3, completed: 4, cancelled: 5}
    validates :status, presence: true
end
