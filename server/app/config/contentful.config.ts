import { createClient } from 'contentful'

import { env } from './env.config'

export const contentfulClient = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN
})
