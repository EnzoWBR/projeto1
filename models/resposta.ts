import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Resposta extends BaseModel {
  public static table = 'respostas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare respostaAluno: string

  @column()
  declare resultadoComparacao: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}