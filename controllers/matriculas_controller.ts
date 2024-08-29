import Matriculas from '#models/matricula'
import type { HttpContext } from '@adonisjs/core/http'

export default class MatriculasController {
    async index({ response }: HttpContext) {
        try {
          const matricula = await Matriculas.all()
          if (matricula.length) {
            response.safeStatus(200).json({
              matricula: matricula,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha matricula a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar a matricula! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const matriculaAdd = await Matriculas.create(data)
    
          return response.safeStatus(201).json({
            message: `matricula ${matriculaAdd.RA}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir a matricula!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const matriculaF = await Matriculas.find(params.id)
    
          if (matriculaF !== null) {
            return response.safeStatus(200).json({
              matriculaF: matriculaF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `matricula não localizada!`,
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
          const matriculita= await Matriculas.findOrFail(params.id)
    
          const { ...data } = request.only([
            'data_matricula',
            'RA',
            'createdAt',
            'updatedAt',
          ])
    
          matriculita.merge(data)
    
          const matriculaModified = await matriculita.save()
    
          return response.safeStatus(201).json({
            message: `matricula ${matriculaModified.RA}, alterado com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar a matricula! ${error}`,
          })
        }
      }
    }
    
