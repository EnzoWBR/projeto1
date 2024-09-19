<template>
  <div class="content">
    <!-- Formulário para adicionar ou editar organização -->
    <form @submit.prevent="saveOrganizacao" class="form">
      <div class="form-row">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input id="nome" type="text" v-model="organizacao.nome" @input="formatarNome" placeholder="Digite o nome" required />
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input id="endereco" type="text" v-model="organizacao.endereco" placeholder="Digite o endereço" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input id="telefone" type="text" v-model="organizacao.telefone" @input="formatarTelefone" placeholder="Digite o telefone" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="organizacao.email" placeholder="Digite o email" required />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">{{ editando ? 'Atualizar' : 'Adicionar' }} Organização</button>
    </form>

    <!-- Listagem das organizações -->
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
        <tr v-for="(organizacao, index) in organizacoes" :key="organizacao.id">
          <td class="info" data-label="Nome">{{ organizacao.nome }}</td>
          <td class="info" data-label="Endereço">{{ organizacao.endereco }}</td>
          <td data-label="Telefone">{{ organizacao.telefone }}</td>
          <td data-label="Email">{{ organizacao.email }}</td>
          <td data-label="Ações">
            <button class="btn btn-edit" @click="editarOrganizacao(index)">Editar</button>
            <button class="btn btn-delete" @click="removerOrganizacao(organizacao.id)">Excluir</button>
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
      organizacoes: [],
      organizacao: { nome: '', endereco: '', telefone: '', email: '' },
      editando: false,
      indiceEdicao: null
    };
  },
  methods: {
    async fetchOrganizacoes() {
      try {
        const response = await axios.get('http://localhost:3333/organizacao');
        this.organizacoes = response.data.organizacoes || [];
      } catch (error) {
        console.error('Erro ao buscar organizações:', error);
      }
    },
    async saveOrganizacao() {
      try {
        if (this.editando) {
          await axios.put(`http://localhost:3333/organizacao/${this.organizacao.id}`, this.organizacao);
          this.editando = false;
        } else {
          await axios.post('http://localhost:3333/organizacao', this.organizacao);
        }
        await this.fetchOrganizacoes();
        this.organizacao = { nome: '', endereco: '', telefone: '', email: '' };
      } catch (error) {
        console.error('Erro ao salvar a organização:', error);
      }
    },
    editarOrganizacao(index) {
      this.organizacao = { ...this.organizacoes[index] };
      this.editando = true;
      this.indiceEdicao = index;
    },
    async removerOrganizacao(id) {
      try {
        await axios.delete(`http://localhost:3333/organizacao/${id}`);
        await this.fetchOrganizacoes();
      } catch (error) {
        console.error('Erro ao remover a organização:', error);
      }
    },
    formatarNome() {
      this.organizacao.nome = this.organizacao.nome.replace(/[^a-zA-Z\s]/g, '');
    },
    formatarTelefone() {
      let telefone = this.organizacao.telefone.replace(/\D/g, '');
      if (telefone.length > 11) {
        telefone = telefone.slice(0, 11);
      }
      if (telefone.length > 6) {
        telefone = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2, 7) + '-' + telefone.slice(7);
      } else if (telefone.length > 2) {
        telefone = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2);
      }
      this.organizacao.telefone = telefone;
    }
  },
  async created() {
    await this.fetchOrganizacoes();
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
  }

  .table tbody td {
    border: none;
    padding-left: 40%;
    position: relative;
  }

  .table tbody td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 10px;
    font-weight: bold;
    text-align: left;
  }
}
</style>
