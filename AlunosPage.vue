<template>
  <div class="content">
    <!-- Formulário para adicionar ou editar aluno -->
    <form @submit.prevent="saveAluno" class="form">
      <div class="form-row">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input
            id="nome"
            type="text"
            v-model="aluno.nome"
            @input="formatarNome"
            placeholder="Digite o nome"
            required
          />
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input
            id="endereco"
            type="text"
            v-model="aluno.endereco"
            placeholder="Digite o endereço"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input
            id="telefone"
            type="text"
            v-model="aluno.telefone"
            @input="formatarTelefone"
            placeholder="Digite o telefone"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="aluno.email"
            placeholder="Digite o email"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ editando ? 'Atualizar' : 'Adicionar' }} Aluno
      </button>
    </form>

    <!-- Listagem dos alunos -->
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aluno, index) in alunos" :key="aluno.id">
          <td class="info" data-label="Nome">{{ aluno.nome }}</td>
          <td data-label="Endereço">{{ aluno.endereco }}</td>
          <td data-label="Telefone">{{ aluno.telefone }}</td>
          <td data-label="Email">{{ aluno.email }}</td>
          <td data-label="Ações" class="actions">
            <div style="display: flex; justify-content: center;">
              <button class="btn btn-edit" @click="editarAluno(index)">Editar</button>
              <button class="btn btn-inactivate" @click="inativarAluno(index)">Inativar</button>
              <button class="btn btn-delete" @click="removerAluno(aluno.id)">Excluir</button>
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
      alunos: [],
      aluno: { nome: '', endereco: '', telefone: '', email: '' },
      editando: false,
      indiceEdicao: null
    };
  },
  methods: {
    async fetchAlunos() {
      try {
        const response = await axios.get('http://localhost:3333/alunos');
        this.alunos = response.data.alunos || [];
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    },
    async saveAluno() {
      try {
        let response;
        if (this.editando) {
          response = await axios.put(`http://localhost:3333/alunos/${this.aluno.id}`, this.aluno);
          this.editando = false;
        } else {
          response = await axios.post('http://localhost:3333/alunos', this.aluno);
        }
        await this.fetchAlunos(); // Atualizar a lista de alunos
        this.aluno = { nome: '', endereco: '', telefone: '', email: '' };
        
        // Mostrar mensagem de sucesso
        alert(response.data.message || 'Aluno(a) salvo com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar o aluno(a):', error);
        alert('Erro ao salvar o aluno(a). Verifique o console para mais detalhes.');
      }
    },
    editarAluno(index) {
      this.aluno = { ...this.alunos[index] };
      this.editando = true;
      this.indiceEdicao = index;
    },
    async removerAluno(id) {
      try {
        await axios.delete(`http://localhost:3333/alunos/${id}`);
        await this.fetchAlunos();
      } catch (error) {
        console.error('Erro ao remover o aluno(a):', error);
      }
    },
    inativarAluno(index) {
      // Apenas remover da lista visualmente, mantendo no backend
      this.alunos.splice(index, 1);
    },
    formatarNome() {
      this.aluno.nome = this.aluno.nome.replace(/[^a-zA-Z\s]/g, '');
    },
    formatarTelefone() {
      let telefone = this.aluno.telefone.replace(/\D/g, '');
      if (telefone.length > 11) {
        telefone = telefone.slice(0, 11);
      }
      if (telefone.length > 6) {
        telefone = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2, 7) + '-' + telefone.slice(7);
      } else if (telefone.length > 2) {
        telefone = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2);
      } else if (telefone.length > 0) {
        telefone = '(' + telefone.slice(0, 2) + ')' + telefone.slice(2);
      }
      this.aluno.telefone = telefone;
    }
  },
  async created() {
    await this.fetchAlunos();
  }
};
</script>

<style scoped>
/* Formulário */
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

input {
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

button.btn-inactivate {
  background-color: #e0a800; /* Cor amarela mais escura */
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

/* Ajuste na tabela */
.table tbody td {
  text-align: center; /* Centraliza o conteúdo das células */
}

/* Responsividade */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }

  .table {
    font-size: 14px;
    width: 100%;
    border-collapse: collapse;
  }

  .table th, .table td {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px 5px;
  }

  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px; /* Adicionar padding aos itens da tabela */
  }

  .table tbody td {
    border: none;
    padding-left: 0; /* Remover padding à esquerda */
    position: relative;
    display: flex; /* Usar flex para melhor controle do layout */
    justify-content: space-between; /* Espaço entre os elementos */
    align-items: center; /* Alinhar verticalmente */
  }

  .table tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    text-align: left;
    flex: 1; /* Permitir que o rótulo ocupe espaço */
  }

  /* Responsividade dos Botões */
  button {
    padding: 8px 5px; /* Ajustar padding dos botões */
    font-size: 12px; /* Diminuir o tamanho da fonte dos botões */
    margin: 5px; /* Espaço entre os botões */
    flex: 1; /* Permitir que os botões ocupem o mesmo espaço */
  }
}
</style>
