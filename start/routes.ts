/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import AlunosController from '#controllers/alunos_controller'
import OrganizacaoController from '#controllers/organizacaos_controller'
import EscolasController from '#controllers/escolas_controller'
import CursosController from '#controllers/cursos_controller'
import ModulosController from '#controllers/modulos_controller'
import MatriculasController from '#controllers/matriculas_controller'
import AulasController from '#controllers/aulas_controller'
import ExercicioController from '#controllers/exercicios_controller'
import RespostaController from '#controllers/respostas_controller'

import router from '@adonisjs/core/services/router'


router.get('/', async () => {
  return {
    hello: 'OLÁ',
  }
})
router.get('alunos', [AlunosController, 'index'])
router.post('alunos',[AlunosController, 'store'])
router.get('alunos/:id',[AlunosController, 'show'])
router.put('alunos',[AlunosController, 'update'])

router.get('organizacao',[OrganizacaoController, 'index'])
router.post('organizacao',[OrganizacaoController, 'store'])
router.get('organizacao/:id',[OrganizacaoController, 'show'])
router.put('organizacao',[OrganizacaoController, 'update'])

router.get('escolas', [EscolasController, 'index'])
router.post('escolas', [EscolasController, 'store'])
router.get('escolas/:id', [EscolasController, 'show'])
router.put('escolas', [EscolasController, 'update'])

router.get('cursos', [CursosController, 'index'])
router.post('cursos', [CursosController, 'store'])
router.get('cursos/:id', [CursosController, 'show'])
router.put('cursos', [CursosController, 'update'])

router.get('modulos', [ModulosController, 'index'])
router.post('modulos', [ModulosController, 'store'])
router.get('modulos/:id', [ModulosController, 'show'])
router.put('modulos', [ModulosController, 'update'])

router.get('matriculas', [MatriculasController, 'index'])
router.post('matriculas', [MatriculasController, 'store'])
router.get('matriculas/:id', [MatriculasController, 'show'])
router.put('matriculas', [MatriculasController, 'update'])

router.get('aulas', [AulasController, 'index'])
router.post('aulas', [AulasController, 'store'])
router.get('aulas/:id', [AulasController, 'show'])
router.put('aulas', [AulasController, 'update'])

router.get('exercicios', [ExercicioController, 'index'])
router.post('exercicios', [ExercicioController, 'store'])
router.get('exercicios/:id', [ExercicioController, 'show'])
router.put('exercicios', [ExercicioController, 'update'])

router.get('respostas', [RespostaController, 'index'])
router.post('respostas', [RespostaController, 'store'])
router.get('respostas/:id', [RespostaController, 'show'])
router.put('respostas', [RespostaController, 'update'])



