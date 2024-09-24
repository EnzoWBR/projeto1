<template>
  <div class="bem-vindo">
    <h1>BEM VINDO AO GERENCIADOR DE DADOS</h1>
    <p>Aqui você poderá gerir as informações necessárias para seu sistema operacional.</p>

    <div class="cards-container">
      <div class="coluna">
        <div class="card" @click="irParaEscolas">
          <h2>Gerencie Escolas</h2>
          <p>Administre todas as escolas do sistema.</p>
        </div>

        <div class="card" @click="irParaAlunos">
          <h2>Administre Alunos</h2>
          <p>Gerencie os alunos e suas informações.</p>
        </div>
      </div>

      <div class="coluna">
        <div class="card" @click="irParaAulas">
          <h2>Organize Aulas</h2>
          <p>Controle as aulas e seus conteúdos.</p>
        </div>

        <div class="card" @click="irParaOrganizacao">
          <h2>Gerencie Organizações</h2>
          <p>Administre as organizações do sistema.</p>
        </div>
      </div>
    </div>

    <div class="linha-azul"></div>
  </div>
</template>

<script>
export default {
  name: 'BemVindoPage',
  methods: {
    irParaEscolas() {
      this.$router.push({ name: 'escolas' });
    },
    irParaAlunos() {
      this.$router.push({ name: 'alunos' });
    },
    irParaAulas() {
      this.$router.push({ name: 'aulas' });
    },
    irParaOrganizacao() {
      this.$router.push({ name: 'organizacao' });
    }
  }
};
</script>

<style scoped>
.bem-vindo {
  text-align: center;
  margin-top: 50px;
  animation: fadeIn 1.5s ease-in-out;
}

.bem-vindo h1 {
  font-size: 3em;
  color: #333;
}

.bem-vindo p {
  font-size: 1.4em;
  color: #666;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 40px; 
  margin-top: 50px;
}

.coluna {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}


.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
}

.card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #007bff;
}

.card p {
  font-size: 1.2em;
  color: #555;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}


.linha-azul {
  width: 100%;
  height: 5px;
  background-color: #007bff;
  margin-top: 50px;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
