import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sender: string | null

  @column()
  declare message: string

  @column.dateTime({ autoCreate: true })
  declare date: DateTime

  @column()
  declare conversationId: number | null

  @column()
  declare chatBubbleColor: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
