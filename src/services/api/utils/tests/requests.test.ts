/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HeseyaPaginatedResponse } from '../../../..'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostNestedRequest,
  createPostRequest,
} from '../requests'

type DummyItem = { id: number }
type DummyItemDto = { name: string }

const dummyItem: DummyItem = { id: 69 }
const dummyItemDto: DummyItemDto = { name: 'dummy' }

const dummyResponseList: HeseyaPaginatedResponse<DummyItem[]> = {
  data: [{ id: 1 }, { id: 2 }, { id: 3 }],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 1,
    total: 1,
    from: 1,
    to: 1,
    path: '/dummy',
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('createGetOneRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products', { byId: true })
    const expectedUrl = '/products/id:test?param=yes'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products')
    const expectedUrl = '/products/test?param=yes'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createGetOneRequest<DummyItem>(axios, 'products', { byId: true }, 'sub')
    const expectedUrl = '/products/id:test/sub?'

    mock.onGet(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test')

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createGetListRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createGetListRequest<DummyItem[]>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute({ param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result.data).toEqual(dummyResponseList.data)
    expect(result.pagination).toEqual({ perPage: 1, currentPage: 1, total: 1, lastPage: 1 })
  })
})

describe('createGetSimpleListRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createGetSimpleListRequest<DummyItem[]>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onGet(expectedUrl).reply(200, dummyResponseList)

    const result = await execute({ param: 'yes' })

    expect(mock.history.get[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponseList.data)
  })
})

describe('createPostRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createPostRequest<DummyItem, DummyItemDto>(axios, 'products', 'sub')
    const expectedUrl = '/products/sub?'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute(dummyItemDto)

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createPostNestedRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createPostNestedRequest<DummyItem, DummyItemDto>(axios, 'products', 'items')
    const expectedUrl = '/products/id:test/items?param=yes'

    mock.onPost(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createPatchRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products/id:test?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request without id', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, 'products')
    const expectedUrl = '/products/id:test?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })

  it('should make a rest request on subroute', async () => {
    const execute = createPatchRequest<DummyItem, DummyItemDto>(axios, 'products', 'sub')
    const expectedUrl = '/products/id:test/sub?'

    mock.onPatch(expectedUrl).reply(200, { data: dummyItem })

    const result = await execute('test', dummyItemDto)

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(dummyItem)
  })
})

describe('createDeleteRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createDeleteRequest(axios, 'products')
    const expectedUrl = '/products/id:test?param=yes'

    mock.onDelete(expectedUrl).reply(200, dummyResponseList)

    const result = await execute('test', { param: 'yes' })

    expect(mock.history.delete[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
