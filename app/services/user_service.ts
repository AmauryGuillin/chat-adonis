import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UserService {
  async getAll() {
    return User.all()
  }

  async getUserByid(id: number) {
    return User.findByOrFail('id', id)
  }

  async getUserByUsername(username: string) {
    return User.findByOrFail('fullName', username)
  }

  async changeChatBubbleColor({ request }: HttpContext) {
    const attr = request.body()
    const user = await User.findByOrFail('id', attr.id)
    user.chatBubbleColor = attr.choice
    await user.save()
    return user
  }

  async getChatBubbleColor(id: number) {
    const user = await User.findByOrFail('id', id)
    return user.chatBubbleColor
  }
}
