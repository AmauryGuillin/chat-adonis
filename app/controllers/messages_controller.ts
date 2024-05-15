// import type { HttpContext } from '@adonisjs/core/http'

import MessageService from '#services/message_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MessagesController {
  constructor(protected messageService: MessageService) {}

  async store(ctx: HttpContext) {
    return this.messageService.storeMessage(ctx)
  }

  async getAllFromGeneral() {
    return this.messageService.getAllGeneralMessages()
  }

  async getAllFromConversation({ params }: HttpContext) {
    return this.messageService.getConversationMessages(params.id)
  }
}
