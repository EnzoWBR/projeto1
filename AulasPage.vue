<template>
  <div class="content">
    <!-- Formulário para adicionar ou editar aula -->
    <form @submit.prevent="saveAula" class="form">
      <div class="form-row">
        <div class="form-group">
          <label for="titulo">Título da Aula</label>
          <input
            id="titulo"
            type="text"
            v-model="aula.titulo"
            placeholder="Digite o título da aula"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="conteudo">Conteúdo</label>
          <textarea
            id="conteudo"
            v-model="aula.conteudo"
            placeholder="Digite o conteúdo"
            required
          ></textarea>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="arquivo">Anexar Arquivo</label>
          <input
            id="arquivo"
            type="file"
            @change="handleFileUpload"
            accept=".pdf, .mp4, .avi"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ editando ? 'Atualizar' : 'Adicionar' }} Aula
      </button>
    </form>

    <!-- Listagem das aulas -->
    <table class="table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Conteúdo</th>
          <th>Arquivo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aula, index) in aulas" :key="aula.id">
          <td class="info" data-label="Título">{{ aula.titulo }}</td>
          <td data-label="Conteúdo">{{ aula.conteudo }}</td>
          <td data-label="Arquivo">{{ aula.arquivo || 'Nenhum arquivo anexado' }}</td>
          <td data-label="Ações" class="actions">
            <div style="display: flex; justify-content: center;">
              <button class="btn btn-edit" @click="editarAula(index)">Editar</button>
              <button class="btn btn-delete" @click="removerAula(aula.id)">Excluir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      aulas: [],
      aula: { titulo: '', conteudo: '', arquivo: null },
      editando: false,
      indiceEdicao: null,
    };
  },
  methods: {
    async fetchAulas() {
      try {
        const response = await axios.get('http://localhost:3333/aulas');
        this.aulas = response.data.aulas || [];
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
      }
    },
    async saveAula() {
      try {
        const formData = new FormData();
        formData.append('titulo', this.aula.titulo);
        formData.append('conteudo', this.aula.conteudo);
        formData.append('arquivo', this.aula.arquivo);

        let response;
        if (this.editando) {
          response = await axios.put(`http://localhost:3333/aulas/${this.aulas[this.indiceEdicao].id}`, formData);
          this.editando = false;
        } else {
          response = await axios.post('http://localhost:3333/aulas', formData);
        }
        await this.fetchAulas(); 
        this.resetForm();
        
  
        alert(response.data.message || 'Aula salva com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar a aula:', error);
        alert('Erro ao salvar a aula. Verifique o console para mais detalhes.');
      }
    },
    resetForm() {
      this.aula = { titulo: '', conteudo: '', arquivo: null };
      this.editando = false;
      this.indiceEdicao = null;
    },
    editarAula(index) {
      this.aula = { ...this.aulas[index] };
      this.editando = true;
      this.indiceEdicao = index;
    },
    async removerAula(id) {
      try {
        await axios.delete(`http://localhost:3333/aulas/${id}`);
        await this.fetchAulas();
      } catch (error) {
        console.error('Erro ao remover a aula:', error);
      }
    },
    handleFileUpload(event) {
      this.aula.arquivo = event.target.files[0];
    },
  },
  async created() {
    await this.fetchAulas();
  },
};
</script>

<style scoped>

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

button.btn-primary {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

/* Tabela */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.table th {
  background-color: #f4f4f4;
}

.info {
  color: black;
}

/* Botões */
button.btn-edit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

button.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsividade */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .table th, .table td {
    display: block;
    text-align: left;
  }

  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
  }

  .table tbody td {
    border: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    flex: 1;
  }

  button {
    padding: 8px 5px;
    font-size: 12px;
    margin: 5px;
    flex: 1;
  }
}
</style>
