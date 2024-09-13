<script>
import axios from '@/axios'; // Importa a configuração do Axios

export default {
  data() {
    return {
      escolas: [],
      escola: { nome: '', endereco: '', cep: '', telefone: '', email: '' },
      editando: false,
      indiceEdicao: null
    };
  },
  methods: {
    async fetchEscolas() {
      try {
        const response = await axios.get('/escolas');
        this.escolas = response.data;
      } catch (error) {
        console.error('Erro ao buscar escolas:', error);
      }
    },
    async saveEscola() {
      try {
        if (this.editando) {
          // Atualiza a escola existente
          await axios.put(`/escolas/${this.escola.id}`, this.escola);
          this.editando = false;
          this.indiceEdicao = null;
        } else {
          // Adiciona nova escola
          await axios.post('/escolas', this.escola);
        }
        // Limpa o formulário
        this.escola = { nome: '', endereco: '', cep: '', telefone: '', email: '' };
        // Atualiza a lista de escolas
        this.fetchEscolas();
      } catch (error) {
        console.error('Erro ao salvar escola:', error);
      }
    },
    async editarEscola(index) {
      this.escola = { ...this.escolas[index] };
      this.editando = true;
      this.indiceEdicao = index;
    },
    async removerEscola(index) {
      try {
        await axios.delete(`/escolas/${this.escolas[index].id}`);
        this.escolas.splice(index, 1);
      } catch (error) {
        console.error('Erro ao remover escola:', error);
      }
    }
  },
  created() {
    this.fetchEscolas();
  }
};
</script>
