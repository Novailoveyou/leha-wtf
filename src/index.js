import { encryptText, normalizeTimestamp, toXDigits } from './utils'

/**
 * @example
 *
 * ```zsh
 * node index --timestamp=1747917364535 --secretkey=secret
 * ```
 * @description
 * [0]: node
 * [1]: index
 * [2]: --timestamp=1747917364535
 * [3]: --secretkey=secret
 */
const TIMESTAMP =
  process.argv.find(arg => arg.includes('--timestamp'))?.split('=')[1] ||
  new Date().getTime()

const SECRET_KEY =
  process.argv.find(arg => arg.includes('--secretkey'))?.split('=')[1] ||
  process.env.SECRET_KEY

/**
 * @description Generates wtf token for the leha's needs
 *
 * @example
 *
 * ```zsh
 * node index 1747917364535 secret
 * ```
 *
 */
const lehaWTF = ((timestamp, secretKey) => {
  const numTimestamp = Number(timestamp)

  if (typeof numTimestamp !== 'number' || Number.isNaN(numTimestamp))
    throw new Error('lehaWTF: timestamp must be a valid number')

  if (typeof secretKey !== 'string' || !secretKey)
    throw new Error('lehaWTF: secretKey must be a non-empty string')

  const normalizedTimestamp = normalizeTimestamp(numTimestamp)

  const wtf = encryptText(normalizedTimestamp, secretKey)

  const output = JSON.stringify({ wtf, timestamp: toXDigits(numTimestamp, 10) })

  console.log(output)

  return output
})(TIMESTAMP, SECRET_KEY)
