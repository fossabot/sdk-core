import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { PaginationParams } from '../types/DefaultParams'
import { OrderStatus, OrderStatusDto } from '../../../interfaces/OrderStatus'
import { createReorderPostRequest } from '../utils/reorder'
import { ReorderEntityRequest } from '../types/Reorder'

export interface OrderStatusesService
  extends Omit<
      CrudService<OrderStatus, OrderStatus, OrderStatusDto, PaginationParams>,
      'getOneBySlug' | 'getOne'
    >,
    EntityMetadataService {
  reorder: ReorderEntityRequest
}

export const createOrderStatusesService: ServiceFactory<OrderStatusesService> = (axios) => {
  const route = 'statuses'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    reorder: createReorderPostRequest(axios, route, 'statuses'),

    ...createEntityMetadataService(axios, route),
  }
}
