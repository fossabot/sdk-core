import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import {
  PaymentMethod,
  PaymentMethodCreateDto,
  PaymentMethodUpdateDto,
} from '../../../interfaces/PaymentMethod'
import { PaginationParams } from '../types/DefaultParams'

interface PaymentMethodsParams extends PaginationParams {
  shipping_method_id?: UUID
}

export type PaymentMethodsService = Omit<
  CrudService<
    PaymentMethod,
    PaymentMethod,
    PaymentMethodCreateDto,
    PaymentMethodUpdateDto,
    PaymentMethodsParams
  >,
  'getOneBySlug' | 'getOne'
>

export const createPaymentMethodsService: ServiceFactory<PaymentMethodsService> = (axios) => {
  const route = 'payment-methods'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
