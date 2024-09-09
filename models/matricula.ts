import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Matricula extends BaseModel {
  public static table = 'matriculas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare data_matricula: DateTime

  @column()
  declare RA: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
