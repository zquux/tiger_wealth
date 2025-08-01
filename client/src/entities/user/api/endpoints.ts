class UserApiEndpoints {
  private readonly baseUrl = '/user'

  me = `${this.baseUrl}/me`

  get root() {
    return this.baseUrl
  }
}

export const userApiEndpoints = new UserApiEndpoints()
