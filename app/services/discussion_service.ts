import Discussion from '#models/discussion'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class DiscussionService {
  async create({ request, response }: HttpContext) {
    const attr = request.body()
    const user = await User.findByOrFail('id', attr.id)
    const correspondantUser = await User.findByOrFail('id', attr.correspondantId)
    if (user.fullName === correspondantUser.fullName) {
      return response.badRequest('You can not create a private discussion with yourself')
    }

    const allDiscussions = await Discussion.all()

    const checkIfdiscussionExistsPremier = allDiscussions.filter(
      (discussion) =>
        discussion.$attributes.correspondantId === correspondantUser.id &&
        discussion.$attributes.initiatorId === user.id
    )

    const checkIfdiscussionExistsSecond = allDiscussions.filter(
      (discussion) =>
        discussion.$attributes.initiatorId === correspondantUser.id &&
        discussion.$attributes.correspondantId === user.id
    )

    if (checkIfdiscussionExistsPremier.length !== 0 || checkIfdiscussionExistsSecond.length !== 0) {
      return response.badRequest(
        `Discussion already exists with user: ${correspondantUser.fullName}`
      )
    }

    const discussionToStore = new Discussion()
    discussionToStore.initiatorId = user.id
    discussionToStore.initiatorUsername = user.fullName
    discussionToStore.correspondantId = correspondantUser.id
    discussionToStore.correspondantUsername = correspondantUser.fullName
    await discussionToStore.save()

    return response.ok({
      message: `Discussion successfully created between users: ${user.fullName} and ${correspondantUser.fullName}`,
      discussion: discussionToStore,
    })
  }
  async getAllUserDiscussions(id: number) {
    const user = await User.findByOrFail('id', id)
    const userDiscussion = await Discussion.all()
    return userDiscussion.filter(
      (discussion) =>
        discussion.$attributes.initiatorId === user.id ||
        discussion.$attributes.correspondantId === user.id
    )
  }
}
