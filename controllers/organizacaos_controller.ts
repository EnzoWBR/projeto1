import Organizacao from '#models/organizacao'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizacaoController {
  async index({ response }: HttpContext) {
    try {
      const organizacao = await Organizacao.all()
      if (organizacao.length) {
        response.safeStatus(200).json({
          organizacao: organizacao,
        })
      } else {
        response.safeStatus(200).json({
          message: `Não ha organizações a listar!`,
        })
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar as organizações! ${error}`,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const { ...data } = request.all()

    try {
      const organizacaoAdd = await Organizacao.create(data)

      return response.safeStatus(201).json({
        message: `Organização ${organizacaoAdd.nome}, criada com sucesso!`,
      })
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao incluir a organização!${error}`,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const organization = await Organizacao.find(params.id)

      if (organization !== null) {
        return response.safeStatus(200).json({
          organization: organization,
        })
      } else {
        return response.safeStatus(200).json({
          message: `Organização não localizada!`,
        })
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar a organização`,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const organizacao= await Organizacao.findOrFail(params.id)

      const { ...data } = request.only([
        'nome',
        'endereco',
        'telefone',
        'email',
        'createdAt',
        'updatedAt',
        
      ])

      organizacao.merge(data)

      const organizationModified = await organizacao.save()

      return response.safeStatus(201).json({
        message: `Organização ${organizationModified.nome}, alterada com sucesso!`,
      })
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao alterar à organização! ${error}`,
      })
    }
  }
}
