import Respostas from '#models/resposta'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModulosController {
    async index({ response }: HttpContext) {
        try {
          const resposta = await Respostas.all()
          if (resposta.length) {
            response.safeStatus(200).json({
              resposta: resposta,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha respostas a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar as respostas! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const respostaAdd = await Respostas.create(data)
    
          return response.safeStatus(201).json({
            message: `resposta ${respostaAdd.id}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir a resposta!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const respostaF = await Respostas.find(params.id)
    
          if (respostaF !== null) {
            return response.safeStatus(200).json({
              respostaF: respostaF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `resposta não localizada!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar a resposta`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const respostita= await Respostas.findOrFail(params.id)
    
          const { ...data } = request.only([
            'respostaAluno',
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
    
