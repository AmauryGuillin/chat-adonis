import DiscussionService from '#services/discussion_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DiscussionsController {
  constructor(protected discussionService: DiscussionService) {}
  async create(ctx: HttpContext) {
    return this.discussionService.create(ctx)
  }
  async getAllUserInDiscussions({ params }: HttpContext) {
    return this.discussionService.getAllUserDiscussions(params.id)
  }
}
