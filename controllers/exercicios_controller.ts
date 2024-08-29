import Exercicio from '#models/exercicio'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExercicioController {
    async index({ response }: HttpContext) {
        try {
          const exercicio = await Exercicio.all()
          if (exercicio.length) {
            response.safeStatus(200).json({
              exercicio: exercicio,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha exercicios a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar os exercicios! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const exerciciosAdd = await Exercicio.create(data)
    
          return response.safeStatus(201).json({
            message: `exercicios ${exerciciosAdd.pergunta}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir o exercicio!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const exercicioF = await Exercicio.find(params.id)
    
          if (exercicioF !== null) {
            return response.safeStatus(200).json({
              exercicioF: exercicioF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `exercicio não localizado!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar o exercício`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const exercito= await Exercicio.findOrFail(params.id)
    
          const { ...data } = request.only([
            'pergunta',
            'respostaCorreta',
            'arquivoExercicio',
            'createdAt',
            'updatedAt',
          ])
    
          exercito.merge(data)
    
          const exercicioModified = await exercito.save()
    
          return response.safeStatus(201).json({
            message: `exercicio ${exercicioModified.id}, alterado com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar o exercício! ${error}`,
          })
        }
      }
    }
    
