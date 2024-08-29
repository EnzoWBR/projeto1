import Escola from '#models/escola'
import type { HttpContext } from '@adonisjs/core/http'

export default class EscolasController {
    async index({ response }: HttpContext) {
        try {
          const escolas = await Escola.all()
          if (escolas.length) {
            response.safeStatus(200).json({
              escolas: escolas,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha escolas a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar as escolas! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const escolaAdd = await Escola.create(data)
    
          return response.safeStatus(201).json({
            message: `escola ${escolaAdd.nome}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir a escola!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const escolaF = await Escola.find(params.id)
    
          if (escolaF !== null) {
            return response.safeStatus(200).json({
              escolaF: escolaF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `Escola não localizada!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar a escola`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const escolita= await Escola.findOrFail(params.id)
    
          const { ...data } = request.only([
            'nome',
            'endereco',
            'cep',
            'telefone',
            'email',
            'createdAt',
            'updatedAt',
          ])
    
          escolita.merge(data)
    
          const escolaModified = await escolita.save()
    
          return response.safeStatus(201).json({
            message: `escola ${escolaModified.nome}, alterada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar à escola! ${error}`,
          })
        }
      }
    }
    
