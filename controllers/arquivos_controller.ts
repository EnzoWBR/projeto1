import type { HttpContext } from '@adonisjs/core/http'

export default class ArquivosController {
  public async store({ request, response }: HttpContext) {
  
    const pdfFile = request.file('pdf_file', {
      extnames: ['pdf'],
      size: '5mb', 
    })

    const audioFile = request.file('audio_file', {
      extnames: ['mp3', 'wav'],
      size: '10mb', 
    })

    const videoFile = request.file('video_file', {
      extnames: ['mp4', 'avi'],
      size: '50mb', 
    })

    
    if (!pdfFile || !audioFile || !videoFile) {
      return response.badRequest('Todos os arquivos são obrigatórios')
    }


    if (!pdfFile.isValid) {
      return response.badRequest(pdfFile.errors)
    }

    if (!audioFile.isValid) {
      return response.badRequest(audioFile.errors)
    }

    if (!videoFile.isValid) {
      return response.badRequest(videoFile.errors)
    }

    try {
  
      await pdfFile.move('tmp/uploads', { name: `pdf_${Date.now()}.${pdfFile.extname}` })
      await audioFile.move('tmp/uploads', { name: `audio_${Date.now()}.${audioFile.extname}` })
      await videoFile.move('tmp/uploads', { name: `video_${Date.now()}.${videoFile.extname}` })
    } catch (error) {
      return response.internalServerError('Erro ao salvar os arquivos')
    }

    return response.ok({ message: 'Arquivos enviados com sucesso!' })
  }
}
