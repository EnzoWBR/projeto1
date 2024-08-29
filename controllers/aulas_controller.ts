import Aulas from '#models/aula'
import type { HttpContext } from '@adonisjs/core/http'

export default class AulasController {
    async index({ response }: HttpContext) {
        try {
          const aula = await Aulas.all()
          if (aula.length) {
            response.safeStatus(200).json({
              aula: aula,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha aula para listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar a aula! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const aulaAdd = await Aulas.create(data)
    
          return response.safeStatus(201).json({
            message: `aula ${aulaAdd.titulo}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir a aula!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const aulaF = await Aulas.find(params.id)
    
          if (aulaF !== null) {
            return response.safeStatus(200).json({
              aulaF: aulaF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `aula não localizada!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar a aula`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const aulita= await Aulas.findOrFail(params.id)
    
          const { ...data } = request.only([
            'titulo',
            'conteudo',
            'arquivo',
            'createdAt',
            'updatedAt',
          ])
    
          aulita.merge(data)
    
          const aulaModified = await aulita.save()
    
          return response.safeStatus(201).json({
            message: `aula ${aulaModified.titulo}, alterado com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar a aula! ${error}`,
          })
        }
      }
    }
    
