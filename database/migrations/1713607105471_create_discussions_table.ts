import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'discussions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.bigInteger('initiator_id').notNullable()
      table.string('initiator_username').notNullable()
      table.bigInteger('correspondant_id').notNullable()
      table.string('correspondant_username').notNullable()
      table.string('last_message').nullable()
      table.dateTime('last_message_Date').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
