<script setup lang="ts">
import { ElCollapse, ElCollapseItem } from 'element-plus'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://surrealdb.com/" target="_blank">
      <img src="@/assets/surrealdb.svg" class="logo" alt="Surrealdb logo" />
    </a>
    <a href="https://element-plus.org/" target="_blank">
      <img src="@/assets/element-plus.svg" class="logo" alt="Element-plus logo" />
    </a>
  </div>
  <div class="intro">
    <p class="intro-cn">这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化 Web 应用模板，集成了 SurrealDB 数据库和 Element Plus UI 框架。采用 WebSocket 实时通信，支持用户认证和权限管理，提供完整的数据库初始化脚本。使用 pnpm 作为包管理器，确保依赖安装快速可靠。</p>
    <p class="intro-en">A modern web application template built with Vue 3 + TypeScript + Vite, featuring SurrealDB database and Element Plus UI framework. With WebSocket real-time communication, user authentication, and permission management, it includes complete database initialization scripts. Uses pnpm as package manager for fast and reliable dependency installation.</p>
    <el-collapse class="usage">
      <el-collapse-item>
        <template #title>
          <span class="collapse-title">使用方法 / Usage Guide</span>
        </template>
        <div class="usage-content">
          <p class="usage-cn">使用方法：1. 修改 .env 文件中的 VITE_SURREALDB 为您的数据库地址；2. 运行 pnpm install 安装依赖；3. 执行 pnpm dev 启动开发服务器。数据库初始化脚本位于 src/surrealdb/* 目录下，包含用户认证和权限管理配置。</p>
          <p class="usage-en">Usage: 1. Update VITE_SURREALDB in .env file with your database URL; 2. Run pnpm install to install dependencies; 3. Execute pnpm dev to start the development server. Database initialization scripts are located in src/surrealdb/* directory, including user authentication and permission management configurations.</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.intro {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  line-height: 1.6;
}

.intro-cn {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.intro-en {
  font-size: 1rem;
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
}

.usage {
  max-width: 800px;
  margin: 0 auto;
}

.collapse-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #409EFF;
}

.usage-content {
  padding: 0.5rem 0;
}

.usage-cn {
  font-size: 1.05rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
  font-weight: 500;
}

.usage-en {
  font-size: 0.95rem;
  color: #4a4a4a;
  font-style: italic;
}

:deep(.el-collapse-item__header) {
  font-size: 1.1rem;
  color: #409EFF;
  border-bottom: 1px solid #EBEEF5;
}

:deep(.el-collapse-item__content) {
  padding: 1rem 0;
}

:deep(.el-collapse-item__wrap) {
  border-bottom: 1px solid #EBEEF5;
}
</style>