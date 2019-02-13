import { defaultLanguage } from '~constants'
const faker = require(`faker/locale/${defaultLanguage}`)

faker.locale = defaultLanguage

export { faker }
