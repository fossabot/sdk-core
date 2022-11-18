import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { CdnMedia } from './CdnMedia'
import { ProductAttribute, ProductListAttribute } from './Attribute'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Tag } from './Tag'
import { CartItemSchemaValue } from './CartItem'
import { OrderDiscount, Sale } from './SalesAndCoupons'
import { ProductWarehouseItem, ProductWarehouseItemDto, WarehouseDeposit } from './WarehouseItem'

export interface ProductList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  cover: CdnMedia | null
  price: number
  price_max: number
  price_min: number
  vat_rate: number
  price_max_initial: number
  price_min_initial: number
  shipping_time: number | null
  shipping_date: string | null
  quantity_step: number
  google_product_category: null | number
  tags: Tag[]
  public: boolean
  visible: boolean
  available: boolean
  /**
   * Indicates if the product has at least one schema, so it cannot be added to cart directly
   */
  has_schemas: boolean
  /**
   * If true, the product will be available to deliver only via ShippingType.Digital methods
   */
  shipping_digital: boolean
  attributes: ProductListAttribute[]
}

export interface Product extends Omit<ProductList, 'attributes'> {
  description_html: string
  description_short: string
  sales: Sale[]
  sets: ProductSet[]
  schemas: Schema[]
  gallery: CdnMedia[]
  seo: SeoMetadata | null
  attributes: ProductAttribute[]
  items: ProductWarehouseItem[]
  /**
   * Order by which the product will be sorted in the catalog (lower is the higher)
   */
  order: number | null
  /**
   * Quantity of the product in the system
   * `null` means, that product has infinity quantity
   */
  quantity: number | null
  /**
   * Summary of the product availability for a different time frames
   * `quantity == null` means, that product has infinity quantity in that time frame
   */
  availability: Array<
    | {
        shipping_time: number
        shipping_date: null
        quantity: number | null
      }
    | {
        shipping_time: null
        shipping_date: string
        quantity: number | null
      }
    | {
        shipping_time: null
        shipping_date: null
        quantity: number | null
      }
  >
}

export interface ProductCreateDto extends CreateMetadataFields {
  name: string
  slug: string
  price: number
  public: boolean
  /**
   * Order by which the product will be sorted in the catalog (lower is the higher)
   */
  order: number | null
  google_product_category: number | null
  description_html?: string
  description_short?: string
  quantity_step?: number
  vat_rate?: number
  sets?: UUID[]
  tags?: UUID[]
  schemas?: UUID[]
  media?: UUID[]
  seo?: SeoMetadataDto
  /**
   * Attribute.id -> AttributeOption.id[]
   */
  attributes?: Record<UUID, UUID[]>
  items?: ProductWarehouseItemDto[]
  /**
   * If true, the product will be available to deliver only via ShippingType.Digital methods
   */
  shipping_digital?: boolean
}

export type ProductUpdateDto = Partial<Omit<ProductCreateDto, keyof CreateMetadataFields>>

//? ------------------------------------------------------------

export interface OrderProductUrl {
  id: UUID
  name: string
  url: string
}

export interface OrderProductUrlUpdateDto {
  is_delivered: boolean
  urls: { [name: string]: string | null }
}

export interface OrderProduct {
  name: string
  quantity: number
  price: number
  price_initial: number
  vat_rate: number
  discounts: OrderDiscount[]
  product: Product
  schemas: CartItemSchemaValue[]
  deposits: WarehouseDeposit[]
  /**
   * Indicates if the urls of this product was sent to the customer
   */
  is_delivered: boolean
  /**
   * Indicates if the product needs to have a digital shipping method
   */
  shipping_digital: boolean
  urls: OrderProductUrl[]
}
