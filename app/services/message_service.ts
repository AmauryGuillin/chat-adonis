import Discussion from '#models/discussion'
import Message from '#models/message'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class MessageService {
  async storeMessage({ request }: HttpContext) {
    const attr = request.body()
    const user = await User.findByOrFail('id', attr.userId)

    if (attr.isFromGeneral) {
      const messageToStore = new Message()
      messageToStore.message = attr.message
      messageToStore.sender = user.fullName
      messageToStore.chatBubbleColor = user.chatBubbleColor
      messageToStore.save()
      return {
        message: 'message stored in db',
        storedMessage: messageToStore,
      }
    }

    const discussion = await Discussion.findByOrFail('id', attr.conversationId)

    const messageToStore = new Message()
    messageToStore.message = attr.message
    messageToStore.sender = user.fullName
    messageToStore.conversationId = attr.conversationId
    messageToStore.chatBubbleColor = user.chatBubbleColor
    await messageToStore.save()

    discussion.lastMessage = attr.message
    await discussion.save()

    return {
      message: 'message stored in db',
      linkedConversationId: attr.conversationId,
      storedMessage: messageToStore,
    }
  }

  async getAllGeneralMessages() {
    return await Message.findManyBy('conversationId', null)
  }

  async getConversationMessages(id: number) {
    return await Discussion.findManyBy('conversationId', id)
  }
}
