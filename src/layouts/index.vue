<template>
  
 
  
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Slidebar></Slidebar></el-aside>
      <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Main from './components/Main.vue'
import Slidebar from './components/Slidebar.vue'
</script>

<style scoped>
.common-layout{
    width: 100%;
	height: 100%;  
}
.el-container {
	width: 100%;
	height: 100%;
}
.el-container .el-aside {
	height: 100%;
	background-color: #304156;
	overflow: hidden;
}
.el-header {
	background-color: #ffffff;
	-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-main {
	padding: 0 20px;
}
</style>