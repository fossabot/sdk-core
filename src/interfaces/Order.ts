import { UUID } from './UUID'
import { Address } from './Address'
import { OrderCartItem } from './CartItem'
import { MetadataFields } from './Metadata'
import { ShippingMethod } from './ShippingMethod'
import { OrderStatus } from './OrderStatus'
import { OrderProduct } from './Product'
import { OrderDiscount } from './SalesAndCoupons'
import { OrderDocument } from './OrderDocuments'

export interface OrderPayment {
  id: UUID
  amount: number
  continue_url: string
  external_id: UUID
  method: string
  paid: boolean
  redirect_url: string
  date: string
}

export interface OrderList extends MetadataFields {
  id: UUID
  code: string
  comment?: string
  created_at: string
  currency: string
  delivery_address: Address
  email: string
  paid: boolean
  shipping_method: ShippingMethod
  status: OrderStatus
  /**
   * Basket value without discounts
   */
  cart_total_initial: number
  /**
   * Basket value after discounts
   */
  cart_total: number

  /**
   * Shipping price without discounts
   */
  shipping_price_initial: number
  /**
   * Shipping price after discounts
   */
  shipping_price: number

  /**
   * Total order value after discounts
   */
  summary: number
  /**
   * Amount already paid by client
   */
  summary_paid: number
  documents: OrderDocument[]
}

export interface Order extends OrderList {
  discounts: OrderDiscount[]
  invoice_address: Address
  payable: boolean
  payments: OrderPayment[]
  products: OrderProduct[]
  shipping_number?: string
}

export interface OrderSummary {
  id: UUID
  code: string
  status: OrderStatus
  paid: boolean
  payable: boolean
  summary: number
  shipping_method_id: ShippingMethod
  created_at: string
}

/**
 * ------------------------------------------------------------
 * ? DTO
 * ------------------------------------------------------------
 */

export interface OrderDto {
  email: string
  comment: string
  shipping_method_id: string
  items: OrderCartItem[]
  delivery_address: Address
  invoice_address: Address | null
  coupons: string[]
  sales_ids: string[]
}

export interface OrderUpdateDto {
  email?: string
  comment?: string
  delivery_address?: Address
  invoice_address?: Address
}
