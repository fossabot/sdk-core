import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import { Product, ProductList, ProductDto } from '../../../interfaces/Product'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { Attribute } from '../../../interfaces'

type DateAttributeFilterValue = { min: Date } | { max: Date } | { min: Date; max: Date }
type NumberAttributeFilterValue = { min: number } | { max: number } | { min: number; max: number }
type AttributeFilter = Record<
  string,
  string | string[] | DateAttributeFilterValue | NumberAttributeFilterValue
>

interface ProductsListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  slug?: string
  public?: boolean
  sets?: UUID[]
  sort?: string
  tags?: UUID[]
  ids?: UUID[]
  available?: boolean
  attribute?: AttributeFilter
  price?: NumberAttributeFilterValue
}

export interface ProductsService
  extends CrudService<Product, ProductList, ProductDto, ProductsListParams>,
    EntityMetadataService,
    EntityAuditsService<Product> {
  getFilters(props?: { sets: UUID[] }): Promise<Attribute[]>
}

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    getFilters: createGetSimpleListRequest(axios, 'filters'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
