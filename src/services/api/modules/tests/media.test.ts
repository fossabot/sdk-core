import axios from 'axios'
import { createReadStream } from 'fs'
import MockAdapter from 'axios-mock-adapter'

import { CdnMediaSource, CdnMediaType } from '../../../../interfaces'
import { createMediaService } from '../media'

const dummyMedia = {
  id: 'id',
  type: CdnMediaType.Photo,
  url: 'url',
  alt: null,
  slug: null,
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('media test service', () => {
  it('should create (upload) media', async () => {
    const service = createMediaService(axios)
    const expectedUrl = `/media`

    mock.onPost(expectedUrl).reply(200, { data: dummyMedia })

    const result = await service.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: createReadStream(__dirname + '/test/mock/dummy.jpg') as any,
    })
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyMedia)
  })

  it('should create external media', async () => {
    const service = createMediaService(axios)
    const expectedUrl = `/media`

    mock.onPost(expectedUrl).reply(200, { data: dummyMedia })

    const result = await service.create({
      type: CdnMediaType.Other,
      source: CdnMediaSource.External,
      url: 'https://example.com',
    })

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)

    expect(result).toEqual(dummyMedia)
  })
})
