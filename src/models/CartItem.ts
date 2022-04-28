import md5 from 'md5'
import round from 'lodash/round'

import { ProductList } from '../interfaces/Product'
import { SchemaType, Schema } from '../interfaces/Schema'
import { calcSchemasPrice } from '../utils/calcSchemasPrice'
import { SavedCartItem, CartItemSchema } from '../interfaces/CartItem'
import { CartItemDto } from '../interfaces/Cart'
import { ProductListAttribute } from '../interfaces'

export class CartItem {
  public qty: number
  public schemas: CartItemSchema[]

  private precalculatedPrice: number | null = null
  private precalculatedInitialPrice: number | null = null

  private productSchemas: Schema[]
  private product: ProductList
  private createdAt: number

  constructor(
    product: ProductList,
    quantity = 1,
    schemas: Schema[] = [],
    schemaValues: CartItemSchema[] = [],
    createdAt = Date.now(),
  ) {
    if (!product) throw new Error('[HS CartItem] Provided props are not valid')

    this.product = product
    this.qty = Number(quantity)
    this.productSchemas = schemas
    this.schemas = schemaValues
    this.createdAt = createdAt
  }

  getOrderObject(): CartItemDto {
    return {
      cartitem_id: this.id,
      product_id: this.product.id,
      quantity: this.qty,
      schemas: Object.fromEntries(this.schemas.map((s) => [s.id, s.value])),
    }
  }

  updateQuantity(newQuantity: number) {
    return new CartItem(
      this.product,
      newQuantity,
      this.productSchemas,
      this.schemas,
      this.createdAt,
    )
  }

  get id() {
    return md5(`${this.product.id}-${this.schemas.map((s) => [s.id, s.value].join('=')).join('&')}`)
  }

  get name() {
    return this.product.name
  }

  get attributes(): ProductListAttribute[] {
    return this.product.attributes
  }

  // ? Singular prices
  get price() {
    if (this.precalculatedPrice) return this.precalculatedPrice

    try {
      return round(this.product.price + calcSchemasPrice(this.schemas), 2)
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('[HS CartItem]', e.message)
      return round(this.product.price, 2)
    }
  }

  get initialPrice() {
    return this.precalculatedInitialPrice || this.price
  }

  get discountValue() {
    return round(this.initialPrice - this.price, 2)
  }

  // ? total prices
  get totalPrice() {
    return round(this.price * this.qty, 2)
  }
  get totalInitialPrice() {
    return round(this.initialPrice * this.qty, 2)
  }
  get totalDiscountValue() {
    return round(this.totalInitialPrice - this.totalPrice, 2)
  }

  setPrices(price: number, initialPrice: number) {
    this.precalculatedPrice = price
    this.precalculatedInitialPrice = initialPrice
    return this
  }

  get cover() {
    return this.product.cover?.url || ''
  }

  get quantityStep() {
    return this.product.quantity_step || 1
  }

  /**
   * Returns [name, value] pair for each schema in CartItem
   * value is a human readable value - so it is a selected option name for Option Schema,
   * or a simple value for any other type
   */
  get variant() {
    return this.schemas.map((schemaValue) => {
      const schema = this.productSchemas.find((s) => s.id === schemaValue.id)
      if (!schema) throw new Error('[HS CartItem] No schema for given schema value!')

      const value =
        schema.type === SchemaType.Select
          ? schema.options.find((op) => op.id === schemaValue.value)?.name
          : String(schemaValue.value)

      return [schemaValue.name, value]
    })
  }

  toJSON(): SavedCartItem {
    return {
      type: 'CartItem',
      product: this.product,
      qty: this.qty,
      schemas: this.schemas,
      productSchemas: this.productSchemas,
      createdAt: this.createdAt,
    }
  }
}
