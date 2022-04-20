import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Banner, BannerCreateDto, BannerUpdateDto } from '../../../interfaces/Banner'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'

interface BannersListParams extends PaginationParams, MetadataParams {
  slug: string[]
}

export type BannersService = Omit<
  CrudService<Banner, Banner, BannerCreateDto, BannerUpdateDto, BannersListParams>,
  'getOne' | 'getOneBySlug'
> &
  EntityMetadataService

export const createBannersService: ServiceFactory<BannersService> = (axios) => {
  const route = 'banners'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
