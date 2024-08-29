import Curso from '#models/curso'
import type { HttpContext } from '@adonisjs/core/http'


export default class CursosController {

    async index({ response }: HttpContext) {
        try {
          const cursos = await Curso.all()
          if (cursos.length) {
            response.safeStatus(200).json({
              cursos: cursos,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha cursos a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar os cursos! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const cursoAdd = await Curso.create(data)
    
          return response.safeStatus(201).json({
            message: `Curso ${cursoAdd.nome}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir o curso!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const cursoF = await Curso.find(params.id)
    
          if (cursoF !== null) {
            return response.safeStatus(200).json({
              cursoF: cursoF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `Curso não localizado!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar o curso`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const cursoup= await Curso.findOrFail(params.id)
    
          const { ...data } = request.only([
            'nome',
            'descricao',
            'cargahoraria',
            'createdAt',
            'updatedAt',
          ])
    
          cursoup.merge(data)
    
          const cursoModified = await cursoup.save()
    
          return response.safeStatus(201).json({
            message: `curso ${cursoModified.nome}, alterada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar o curso! ${error}`,
          })
        }
      }
    }
