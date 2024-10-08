import AlunosController from '#controllers/alunos_controller'
import OrganizacaoController from '#controllers/organizacao_controller'
import EscolasController from '#controllers/escolas_controller'
import CursosController from '#controllers/cursos_controller'
import ModulosController from '#controllers/modulos_controller'
import MatriculasController from '#controllers/matriculas_controller'
import AulasController from '#controllers/aulas_controller'
import ExercicioController from '#controllers/exercicios_controller'
import RespostaController from '#controllers/respostas_controller'
import UploadController from '#controllers/uploads_controller'

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'OLÁ MEUS AMIGOS',
  }
})

router.get('alunos', [AlunosController, 'index'])
router.post('alunos', [AlunosController, 'store'])
router.get('alunos/:id', [AlunosController, 'show'])
router.put('alunos/:id', [AlunosController, 'update'])
router.delete('alunos/:id', [AlunosController, 'destroy'])  // Adicione esta linha

router.get('organizacao', [OrganizacaoController, 'index'])
router.post('organizacao', [OrganizacaoController, 'store'])
router.get('organizacao/:id', [OrganizacaoController, 'show'])
router.put('organizacao/:id', [OrganizacaoController, 'update'])
router.delete('organizacao/:id', [OrganizacaoController, 'destroy'])  // Adicione esta linha

router.get('escolas', [EscolasController, 'index'])
router.post('escolas', [EscolasController, 'store'])
router.get('escolas/:id', [EscolasController, 'show'])
router.put('escolas/:id', [EscolasController, 'update'])
router.delete('escolas/:id', [EscolasController, 'destroy'])  // Adicione esta linha

router.get('cursos', [CursosController, 'index'])
router.post('cursos', [CursosController, 'store'])
router.get('cursos/:id', [CursosController, 'show'])
router.put('cursos/:id', [CursosController, 'update'])

router.get('modulos', [ModulosController, 'index'])
router.post('modulos', [ModulosController, 'store'])
router.get('modulos/:id', [ModulosController, 'show'])
router.put('modulos/:id', [ModulosController, 'update'])

router.get('matriculas', [MatriculasController, 'index'])
router.post('matriculas', [MatriculasController, 'store'])
router.get('matriculas/:id', [MatriculasController, 'show'])
router.put('matriculas/:id', [MatriculasController, 'update'])

router.get('aulas', [AulasController, 'index'])
router.post('aulas', [AulasController, 'store'])
router.get('aulas/:id', [AulasController, 'show'])
router.put('aulas/:id', [AulasController, 'update'])
router.delete('aulas/:id', [AulasController, 'destroy'])  // Adicione esta linha

router.get('exercicios', [ExercicioController, 'index'])
router.post('exercicios', [ExercicioController, 'store'])
router.get('exercicios/:id', [ExercicioController, 'show'])
router.put('exercicios/:id', [ExercicioController, 'update'])

router.get('respostas', [RespostaController, 'index'])
router.post('respostas', [RespostaController, 'store'])
router.get('respostas/:id', [RespostaController, 'show'])
router.put('respostas/:id', [RespostaController, 'update'])

router.post('/upload', [UploadController, 'store'])
