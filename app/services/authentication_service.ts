import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthenticationService {
  async register({ request, response }: HttpContext) {
    const attributes = request.body()
    try {
      const tempUser = await User.findBy('email', attributes.email)
      if (tempUser) response.abort('email already used')

      const user = new User()
      user.fullName = attributes.fullName
      user.email = attributes.email
      user.password = attributes.password
      user.chatBubbleColor = 'chat-bubble-info'
      await user.save()

      logger.info({
        message: 'A new user is now registered',
        user: user,
      })

      return {
        message: 'User successfully registered',
        user: user,
      }
    } catch (error) {
      return error
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    logger.info({
      message: 'A user is now connected',
      user: user,
    })
    return {
      token: token,
      userID: user.id,
      username: user.fullName,
    }
  }
}
