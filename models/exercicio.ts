import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Exercicio extends BaseModel {
  public static table = 'exercicios'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pergunta: string

  @column()
  declare respostaCorreta: string

  @column()
  declare arquivoExercicio: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}