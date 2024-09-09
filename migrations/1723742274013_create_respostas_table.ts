import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'respostas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_alunos').references('id').inTable('alunos')
      table.integer('id_exercicios').references('id').inTable('exercicios')

      table.text('respostaAluno').notNullable()
      table.boolean('resultadoComparacao').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
