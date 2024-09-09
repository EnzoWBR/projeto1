import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'escolas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_organizacao').references('id').inTable('organizacao')

      table.string('nome').notNullable()
      table.string('endereco').notNullable()
      table.string('cep').notNullable()
      table.string('telefone').notNullable()
      table.string('email').notNullable()
     
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
