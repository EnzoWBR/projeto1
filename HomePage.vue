<template>
  <div class="bem-vindo">
    <h1>BEM VINDO AO GERENCIADOR DE DADOS</h1>
    <p>Aqui você poderá gerir as informações necessárias para seu sistema operacional.</p>
    
    <!-- Seção de animação -->
    <div class="anima">
      <p>Explore nossos recursos e comece a otimizar seus processos!</p>
    </div>

    <!-- Imagem centralizada -->
    <div class="imagem">
      <img src="@/assets/wash2.jpeg" alt="Imagem de boas-vindas" />
    </div>

    <!-- Botão animado -->
    <div class="botao">
      <button @click="irParaEscolas">Comece Agora</button>
    </div>

    <!-- Linha azul ao final da página -->
    <div class="linha-azul"></div>
  </div>
</template>

<script>
export default {
  name: 'BemVindoPage',
  methods: {
    irParaEscolas() {
      this.$router.push({ name: 'escolas' });
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

.anima {
  margin-top: 20px;
  font-size: 1.2em;
  animation: fadeInUp 2s ease-in-out;
}

.imagem {
  margin-top: 30px;
}

.imagem img {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.botao {
  margin-top: 40px;
}

.botao button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  animation: bounceIn 2s;
  transition: background-color 0.3s;
}

.botao button:hover {
  background-color: #45a049;
}

/* Linha azul ao final da página */
.linha-azul {
  width: 100%;
  height: 5px;
  background-color: #007bff;
  margin-top: 50px;
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

