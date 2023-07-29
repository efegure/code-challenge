export type Car = {
  carId: String
  inStock: Boolean
  horsePower: Number
  price: Price
  color: String
}

type Price = {
  symbol: String
  amount: Number
}
