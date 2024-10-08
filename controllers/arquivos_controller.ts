import type { HttpContext } from '@adonisjs/core/http'
import Arquivo from '#models/arquivo'


export default class UploadController {
  public async store({ request, response }: HttpContext) {
    const pdfFile = request.file('pdf', { extnames: ['pdf'], size: '5mb' })
    const audioFile = request.file('audio', { extnames: ['mp3', 'wav'], size: '10mb' })
    const videoFile = request.file('video', { extnames: ['mp4', 'avi'], size: '50mb' })

    if (!pdfFile || !audioFile || !videoFile) {
      return response.badRequest('Todos os arquivos são obrigatórios')
    }

    if (!pdfFile.isValid) return response.badRequest(pdfFile.errors)
    if (!audioFile.isValid) return response.badRequest(audioFile.errors)
    if (!videoFile.isValid) return response.badRequest(videoFile.errors)

    try {
      const pdfPath = `tmp/uploads/pdf_${Date.now()}.${pdfFile.extname}`
      const audioPath = `tmp/uploads/audio_${Date.now()}.${audioFile.extname}`
      const videoPath = `tmp/uploads/video_${Date.now()}.${videoFile.extname}`

      await pdfFile.move('tmp/uploads', { name: pdfPath })
      await audioFile.move('tmp/uploads', { name: audioPath })
      await videoFile.move('tmp/uploads', { name: videoPath })

      const arquivo = new Arquivo()
      arquivo.pdf = pdfPath
      arquivo.audio = audioPath
      arquivo.video = videoPath
      await arquivo.save()

      return response.ok({ message: 'Arquivos enviados com sucesso!', arquivo })
    } catch (error) {
      return response.internalServerError('Erro ao salvar os arquivos')
    }
  }
}
