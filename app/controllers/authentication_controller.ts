// import type { HttpContext } from '@adonisjs/core/http'

import AuthenticationService from '#services/authentication_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticationController {
  constructor(protected authService: AuthenticationService) {}

  async register(ctx: HttpContext) {
    return this.authService.register(ctx)
  }

  async login(ctx: HttpContext) {
    return this.authService.login(ctx)
  }
}
