import { Price, PriceDto } from '../interfaces'

// TODO: unit tests
export const parsePrices = (prices: Price[], currency: string, type: 'gross' | 'net' = 'gross') =>
  parseFloat((prices || []).find((price) => price.currency === currency)?.[type] || '0') || 0

// TODO: unit tests
export const parsePriceDtos = (prices: PriceDto[], currency: string) =>
  parseFloat((prices || []).find((price) => price.currency === currency)?.value || '0') || 0
