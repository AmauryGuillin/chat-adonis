// import type { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async getAll() {
    return this.userService.getAll()
  }

  async getUserById({ params }: HttpContext) {
    return this.userService.getUserByid(params.id)
  }

  async getUserByUsername({ params }: HttpContext) {
    return this.userService.getUserByUsername(params.username)
  }

  async changeChatBubbleColor(ctx: HttpContext) {
    return this.userService.changeChatBubbleColor(ctx)
  }

  async getChatBubbleColor({ params }: HttpContext) {
    return this.userService.getChatBubbleColor(params.id)
  }
}
