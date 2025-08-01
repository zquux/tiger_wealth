class SessionApiEndpoints {
  private readonly baseUrl = '/auth'

  signup = `${this.baseUrl}/signup`
  signin = `${this.baseUrl}/signin`
  tokens = `${this.baseUrl}/tokens`
  logout = `${this.baseUrl}/logout`
}

export const sessionApiEndpoints = new SessionApiEndpoints()
