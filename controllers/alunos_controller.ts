import Aluno from '#models/aluno'
import type { HttpContext } from '@adonisjs/core/http'


export default class AlunosController {

    async index({ response }: HttpContext) {
        try {
          const alunos = await Aluno.all()
          if (alunos.length) {
            response.safeStatus(200).json({
              alunos: alunos,
            })
          } else {
            response.safeStatus(200).json({
              message: `Não ha alunos a listar!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar os alunos! ${error}`,
          })
        }
      }
    
      async store({ request, response }: HttpContext) {
        const { ...data } = request.all()
    
        try {
          const alunoAdd = await Aluno.create(data)
    
          return response.safeStatus(201).json({
            message: `Aluno ${alunoAdd.nome}, criada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir o aluno!${error}`,
          })
        }
      }
    
      async show({ params, response }: HttpContext) {
        try {
          const alunoF = await Aluno.find(params.id)
    
          if (alunoF !== null) {
            return response.safeStatus(200).json({
              alunoF: alunoF,
            })
          } else {
            return response.safeStatus(200).json({
              message: `Aluno não localizado!`,
            })
          }
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao consultar o aluno`,
          })
        }
      }
    
      async update({ params, request, response }: HttpContext) {
        try {
          const alunoup= await Aluno.findOrFail(params.id)
    
          const { ...data } = request.only([
            'nome',
            'endereco',
            'telefone',
            'email',
            'createdAt',
            'updatedAt',
          ])
    
          alunoup.merge(data)
    
          const alunoModified = await alunoup.save()
    
          return response.safeStatus(201).json({
            message: `aluno ${alunoModified.nome}, alterada com sucesso!`,
          })
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao alterar o aluno! ${error}`,
          })
        }
      }
    }
