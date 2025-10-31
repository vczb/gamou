require 'securerandom'
require 'open-uri'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding started..."

# Timestamps
now       = Time.current
day_ago   = 1.day.ago
week_ago  = 1.week.ago
month_ago = 1.month.ago

ActiveRecord::Base.transaction do
  # Users
  admin = User.find_or_create_by!(email: 'admin@gamou.com') do |u|
    u.password = 'GamouR00T'
    u.password_confirmation = 'GamouR00T'
    u.is_admin = true
    u.owner_name = 'Gamou'
    u.company_name = 'Gamou'
    u.phone = '051999999999'
    u.plan = User.plans[:yearly]
    u.created_at = month_ago
  end

  demo = User.find_or_create_by!(email: 'demo@gamou.com') do |u|
    u.password = 'password123'
    u.password_confirmation = 'password123'
    u.is_admin = false
    u.owner_name = 'Demo Owner'
    u.company_name = 'Demo Ltd'
    u.phone = '+55 51 90000-0000'
    u.plan = User.plans[:monthly]
    u.created_at = week_ago
  end

  users = [admin, demo]

  # Customers
  customers_by_user = {}
  users.each do |u|
    c1 = Customer.find_or_create_by!(email: "#{u.email.split('@').first}.c1@example.com", user_id: u.id) do |rec|
      rec.name = 'Alex Silva'
      rec.phone = '+55 51 90000-0001'
      rec.gender = Customer.genders.keys.first
      rec.dni = '000000001'
      rec.birthday = 30.years.ago.to_date
      rec.uid = SecureRandom.uuid
      rec.created_at = now
    end

    c2 = Customer.find_or_create_by!(email: "#{u.email.split('@').first}.c2@example.com", user_id: u.id) do |rec|
      rec.name = 'Jamie Santos'
      rec.phone = '+55 51 90000-0002'
      rec.gender = Customer.genders.keys.second || Customer.genders.keys.first
      rec.dni = '000000002'
      rec.birthday = 28.years.ago.to_date
      rec.uid = SecureRandom.uuid
      rec.created_at = day_ago
    end

    customers_by_user[u.id] = [c1, c2]
  end

  # Products
  products_by_user = {}
  users.each_with_index do |u, uidx|
    p1 = Product.find_or_create_by!(name: 'Diamond Pack 100', user_id: u.id) do |rec|
      rec.price_in_diamonds = 100
      rec.short_description = 'Starter pack'
      rec.description = 'A simple starter pack.'
      rec.created_at = now
    end
    if !p1.image.attached?
      begin
        io = URI.open("https://picsum.photos/seed/#{p1.name.parameterize}-#{uidx}/800/600")
        p1.image.attach(io: io, filename: "#{p1.name.parameterize}.jpg", content_type: 'image/jpeg')
      rescue => e
        warn "Image attach failed for #{p1.name}: #{e.message}"
      end
    end

    p2 = Product.find_or_create_by!(name: 'VIP Booster', user_id: u.id) do |rec|
      rec.price_in_diamonds = 750
      rec.short_description = 'Limited'
      rec.description = 'VIP perks for 7 days.'
      rec.created_at = week_ago
    end
    if !p2.image.attached?
      begin
        io = URI.open("https://picsum.photos/seed/#{p2.name.parameterize}-#{uidx}/800/600")
        p2.image.attach(io: io, filename: "#{p2.name.parameterize}.jpg", content_type: 'image/jpeg')
      rescue => e
        warn "Image attach failed for #{p2.name}: #{e.message}"
      end
    end

    products_by_user[u.id] = [p1, p2]
  end

  # Transactions
  users.each do |u|
    customers = customers_by_user[u.id]
    prods = products_by_user[u.id]
    next if customers.blank? || prods.blank?

    t1 = Transaction.find_or_create_by!(
      user_id: u.id,
      customer_id: customers.first.id,
      product_id: prods.first.id,
      transaction_type: Transaction.transaction_types.keys.first,
      price_in_diamonds: prods.first.price_in_diamonds,
      price_in_cents: (u.diamond_price_in_cents || 1000) * prods.first.price_in_diamonds,
      created_at: now
    )

    t2 = Transaction.find_or_create_by!(
      user_id: u.id,
      customer_id: customers.last.id,
      product_id: prods.last.id,
      transaction_type: Transaction.transaction_types.keys.last,
      price_in_diamonds: prods.last.price_in_diamonds,
      price_in_cents: (u.diamond_price_in_cents || 1000) * prods.last.price_in_diamonds,
      created_at: day_ago
    )
  end
end

puts "Seeding finished."
