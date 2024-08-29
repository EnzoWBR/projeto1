import Modulos from '#models/modulo'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModulosController {
    async index({ response }: HttpContext) {
        try {
          const modulo = await Modulos.all()
          if (modulo.length) {
            response.safeStatus(200).json({
              modulo: modulo,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha modulos a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar os modulos! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const modulosAdd = await Modulos.create(data)
    
          return response.safeStatus(201).json({
            message: `modulos ${modulosAdd.nome}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir o exercicio!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const modulosF = await Modulos.find(params.id)
    
          if (modulosF !== null) {
            return response.safeStatus(200).json({
              modulosF: modulosF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `modulo não localizado!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar o modulo`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const modulito= await Modulos.findOrFail(params.id)
    
          const { ...data } = request.only([
            'nome',
            'descricao',
            'createdAt',
            'updatedAt',
          ])
    
          modulito.merge(data)
    
          const modulosModified = await modulito.save()
    
          return response.safeStatus(201).json({
            message: `modulo ${modulosModified.id}, alterado com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar o modulo! ${error}`,
          })
        }
      }
    }
    
