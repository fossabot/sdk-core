import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import {
  DiscountCode,
  DiscountCodeCreateDto,
  DiscountCodeUpdateDto,
} from '../../../interfaces/DiscountCode'
import { createEntityAuditsService, EntityAuditsService } from './audits'

interface DiscountsListParams extends SearchParam, PaginationParams, MetadataParams {
  code?: string
  description?: string
}

export type DiscountsService = Omit<
  CrudService<
    DiscountCode,
    DiscountCode,
    DiscountCodeCreateDto,
    DiscountCodeUpdateDto,
    DiscountsListParams
  >,
  'getOne'
> &
  EntityMetadataService &
  EntityAuditsService<DiscountCode>

export const createDiscountsService: ServiceFactory<DiscountsService> = (axios) => {
  const route = 'discounts'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
