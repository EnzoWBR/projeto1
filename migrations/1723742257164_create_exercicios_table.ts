import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercicios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_aulas').references('id').inTable('aulas')

      table.text('pergunta').notNullable()
      table.text('resposta_correta').notNullable()
      table.string('arquivo_exercicio').notNullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}