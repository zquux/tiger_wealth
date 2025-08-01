import * as contentful from 'contentful'

export const contentfulClient = contentful.createClient({
  space: 'dbqma0dir288',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'SHE4WAWJKud0Ibi7jxr7RjAyCz8PNwHUS_-BhyWq75U'
})
