import { AES } from 'crypto-js'

/**
 * @param num - any number
 * @param width - amount of digits
 * @returns rounded number with fixed amount of dights
 */
export const toXDigits = (num, width = 10) => {
  if (typeof num !== 'number')
    throw new Error('toXDigits: first argument must be typeof number')

  if (typeof width !== 'number' || width <= 0)
    throw new Error('toXDigits: second argument must be positive integer')

  const prefix = num < 0 ? '-' : ''

  const str = String(num).replace('-', '')

  if (str.length < width)
    return Number(
      `${prefix}${str}${Array.from({
        length: width - str.length,
      }).reduce(acc => `${acc}0`, '')}`,
    )

  const output = str.slice(0, width)

  const remainder = Math.round(Number(`0.${str.slice(width)}`))

  return Number(`${prefix}${Number(output) + remainder}`)
}

export const createWTF = (str, secretKey) => {
  if (typeof str !== 'string' || !str)
    throw new Error('createWTF: str must be a non-empty string')

  if (typeof secretKey !== 'string' || !secretKey)
    throw new Error('createWTF: secretKey must be a non-empty string')

  return AES.encrypt(str, secretKey).toString()
}

export const normalizeTimestamp = timestamp => {
  if (typeof timestamp !== 'number')
    throw new Error('normalizeTimestamp: timestamp must be typeof number')

  return Math.floor(timestamp / 1e3)
}
