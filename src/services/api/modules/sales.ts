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
import { Sale, SaleCreateDto, SaleUpdateDto } from '../../../interfaces/SalesAndCoupons'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { UUID } from '../../../interfaces/UUID'

interface SalesListParams extends SearchParam, PaginationParams, MetadataParams {
  search?: string
  description?: string
  for_role?: UUID
  ids?: UUID[]
}

export type SalesService = Omit<
  CrudService<Sale, Sale, SaleCreateDto, SaleUpdateDto, SalesListParams>,
  'getOneBySlug'
> &
  EntityMetadataService &
  EntityAuditsService<Sale>

export const createSalesService: ServiceFactory<SalesService> = (axios) => {
  const route = 'sales'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
