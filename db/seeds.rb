# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

require 'faker'

puts 'Cleaning Database...'
Category.delete_all
Product.delete_all
Cart.delete_all
Account.delete_all

puts 'Creating test user...'
Account.create!(
  email: 'user@test.com',
  password: '123456'
)

puts 'Creating test admin...'
Account.create!(
  email: 'admin@test.com',
  password: '123456',
  role: 'Admin'
)
puts 'Creating test manager...'
Account.create!(
  email: 'manager@test.com',
  password: '123456',
  role: 'Manager'
)

puts 'Creating Categories...'

categories = [
  { name: 'Biography' },
  { name: 'Children' },
  { name: 'Comics & Graphic Novels' },
  { name: 'Cooking, Food & Wine' },
  { name: 'Craft & Hobbies' },
  { name: 'Fiction' },
  { name: 'Health & Fitness' }
]

Category.create!(categories)

puts 'Creating Products...'
images = [
  'https://picsum.photos/id/1005/280/400/',
  'https://picsum.photos/id/1010/280/400/',
  'https://picsum.photos/id/1013/280/400/',
  'https://picsum.photos/id/1014/280/400/',
  'https://picsum.photos/id/1025/280/400/',
  'https://picsum.photos/id/1054/280/400/',
  'https://picsum.photos/id/1059/280/400/',
  'https://picsum.photos/id/1073/280/400/',
  'https://picsum.photos/id/1082/280/400/',
  'https://picsum.photos/id/1081/280/400/',
  'https://picsum.photos/id/119/280/400/',
  'https://picsum.photos/id/146/280/400/',
  'https://picsum.photos/id/145/280/400/',
  'https://picsum.photos/id/157/280/400https://picsum.photos/id/153/280/400//',
  'https://picsum.photos/id/164/280/400/',
  ''
]
40.times do
  Product.create!(
    category_id: rand(1..7),
    title: Faker::Book.unique.title,
    description: Faker::Lorem.unique.paragraph_by_chars(number: 100, supplemental: false),
    image_url: images.sample,
    price: rand(20.00..80.00)
  )
end

puts 'Done!'
