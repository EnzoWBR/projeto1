<template>
  <div class="app-container">
    <!-- Menu Lateral -->
    <aside class="sidebar" :class="{ 'menu-visible': menuVisible }">
      <div class="sidebar-header">
        <img src="@/assets/logo2.png" alt="Logo" class="sidebar-logo" @click="navigateTo('bemVindo')" />
        <button class="menu-toggle" @click="toggleMenu">
          <!-- Condição para alterar a cor do ícone do sanduíche -->
          <span class="menu-icon" :class="{ 'menu-icon-white': menuVisible }">&#9776;</span>
        </button>
      </div>
      <ul>
        <li :class="{ 'active': isActive('escolas') }" @click="navigateTo('escolas')">Escolas</li>
        <li :class="{ 'active': isActive('alunos') }" @click="navigateTo('alunos')">Alunos</li>
        <li :class="{ 'active': isActive('organizacao') }" @click="navigateTo('organizacao')">Organização</li>
        <li :class="{ 'active': isActive('aulas') }" @click="navigateTo('aulas')">Aulas</li>
      </ul>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="main-content">
      <header class="header" :class="{ 'centered-header': isCentered }">
        <button class="menu-toggle" @click="toggleMenu">
          <!-- O ícone de menu fora do sidebar -->
          <span class="menu-icon">&#9776;</span>
        </button>
        <img v-if="!isCentered" src="@/assets/washington.png" alt="Logo" class="logo" />
        <h1 v-if="!isCentered">{{ pageTitle }}</h1>
      </header>
      <router-view @updateTitle="updateTitle" />
    </main>

    <!-- Tabela Responsiva -->
    <div class="table-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  data() {
    return {
      menuVisible: false,
      pageTitle: 'Gerenciador de Dados', // Valor padrão
      isCentered: false // Para controlar a centralização do header
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    function navigateTo(page) {
      router.push({ name: page });
    }

    function isActive(page) {
      return route.name === page;
    }

    return { navigateTo, isActive };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    updateTitle(title) {
      this.pageTitle = title;
    },
    handleResize() {
      if (window.innerWidth >= 768) {
        this.menuVisible = true;
      } else {
        this.menuVisible = false;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    '$route'(to) {
      if (to.name === 'escolas') {
        this.pageTitle = 'Gerenciador de Escolas';
        this.isCentered = false;
      } else if (to.name === 'organizacao') {
        this.pageTitle = 'Gerenciador de Organização';
        this.isCentered = false;
      } else if (to.name === 'alunos') {
        this.pageTitle = 'Gerenciador de Alunos';
        this.isCentered = false;
      } else if (to.name === 'aulas') {
        this.pageTitle = 'Gerenciador de Aulas';
        this.isCentered = false;
      } else if (to.name === 'bemVindo') {
        this.isCentered = true; // Centraliza na página de boas-vindas
      } else {
        this.pageTitle = 'Gerenciador de Dados';
        this.isCentered = false;
      }
    }
  }
};
</script>

<style scoped>
/* Layout Principal */
.app-container {
  display: flex;
  font-family: 'Poppins', sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
}

/* Menu Lateral */
.sidebar {
  width: 160px;
  background-color: #1a1a1d;
  padding: 20px;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  z-index: 1000;
  opacity: 0;
}

.menu-visible {
  transform: translateX(0);
  opacity: 1;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-logo {
  max-width: 150px;
  height: auto;
  cursor: pointer;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  background-color: #444;
  color: #f0f0f0;
  transition: background-color 0.3s;
}

.sidebar li.active,
.sidebar li:hover {
  background-color: #007bff;
}

.main-content {
  margin-left: 175px;
  padding: 20px;
  background-color: #f0f4f8;
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
  color: #333;
  border-bottom: 2px solid #007bff;
}

.centered-header {
  justify-content: center; /* Centraliza na página de boas-vindas */
}

.logo {
  max-width: 150px;
  height: auto;
}

h1 {
  font-size: 24px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}

/* Estilos do ícone de menu sanduíche */
.menu-icon {
  color: black; /* Cor padrão do ícone */
}

.menu-icon-white {
  color: white; /* Cor branca quando o menu está aberto */
}

/* Estilos da Tabela Responsiva */
.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

table th,
table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  background-color: #ffffff;
}

table th {
  background-color: #007bff;
  color: white;
}

table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .main-content {
    margin-left: 0;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo {
    margin-right: 0;
    margin-bottom: 10px;
  }

  table thead {
    display: none;
  }

  table,
  table tbody,
  table tr,
  table td {
    display: block;
    width: 100%;
  }

  table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>
