import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Arquivo extends BaseModel {
  public static table = 'arquivos'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pdf: string

  @column()
  declare audio: string

  @column()
  declare video: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}