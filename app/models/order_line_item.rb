class OrderLineItem < ApplicationRecord
    has_one :item
    belongs_to :order
    validates :item, presence: true
    validates :order, presence: true
end
