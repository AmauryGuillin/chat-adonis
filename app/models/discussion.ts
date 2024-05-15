import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Discussion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare initiatorId: number

  @column()
  declare initiatorUsername: string | null

  @column()
  declare correspondantId: number

  @column()
  declare correspondantUsername: string | null

  @column()
  declare lastMessage: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare lastMessageDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
