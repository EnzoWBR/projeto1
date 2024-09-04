import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'arquivo'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('pdf').notNullable()
      table.string('audio').notNullable()
      table.string('video').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}