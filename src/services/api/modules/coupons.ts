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
import { Coupon, CouponCreateDto, CouponUpdateDto } from '../../../interfaces/SalesAndCoupons'
import { createEntityAuditsService, EntityAuditsService } from './audits'

interface CouponsListParams extends SearchParam, PaginationParams, MetadataParams {
  code?: string
  description?: string
}

export type CouponsService = CrudService<
  Coupon,
  Coupon,
  CouponCreateDto,
  CouponUpdateDto,
  CouponsListParams
> &
  EntityMetadataService &
  EntityAuditsService<Coupon>

export const createCouponsService: ServiceFactory<CouponsService> = (axios) => {
  const route = 'coupons'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    getOneBySlug: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
