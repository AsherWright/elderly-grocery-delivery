# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
camembert = GroceryItem.create(name: "Camembert", price: 7.50)
GroceryItem.create(name: "Paper Towel", price: 4.55)
GroceryItem.create(name: "Smelly bananas", price: 10)
GroceryItem.create(name: "Apricots", price: 12.50)
address = Address.create!(name: "Asher", address_line: "1 Hacker way", city: "Menlo Park", province: "CA", country: "US", postal_code: "94025")
first_order = Order.create(destination: address, status: "unconfirmed")
OrderLineItem.create!(grocery_item: camembert, order: first_order, quantity: 2)
