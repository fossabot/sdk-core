import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { AnalyticsPaymentsSummary, HeseyaResponse } from '../../../../interfaces'
import { createAnalyticsService } from '../analytics'

const dummyResponse: HeseyaResponse<AnalyticsPaymentsSummary> = {
  data: {
    summary: {
      amount: 100,
      count: 10,
    },
  },
  meta: {
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

describe('analytics service test', () => {
  it('should make a request to get payments summary', async () => {
    const service = createAnalyticsService(axios)
    const expectedUrl = 'analytics/payments?'

    mock.onGet(expectedUrl).reply(200, dummyResponse)

    const result = await service.getPayments()

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyResponse.data)
  })
})
