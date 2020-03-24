class OrderLineItem < ApplicationRecord
    belongs_to :grocery_item
    belongs_to :order
    validates :grocery_item, presence: true
    validates :order, presence: true
end
