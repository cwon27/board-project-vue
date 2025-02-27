<template>
  <div class="wrap">
    <BoardHeader />
    <div class="container">
      <Menubar />
      <div class="contents">
        <div class="location">
          <span class="ic-home">HOME</span>
          <span>커뮤니티</span>
          <em>통합게시판</em>
        </div>
        <div class="tit-area">
          <h3 class="h3-tit">통합게시판</h3>
        </div>
        <!-- react의 Outlet과 같은 역할 -->
        <router-view />
      </div>
    </div>
    <FloatRight />
    <BoardFooter />
  </div>
</template>

<script setup>
import FloatRight from "./components/layout/FloatRight.vue";
import Menubar from "./components/layout/Menubar.vue";
import BoardFooter from "./components/layout/BoardFooter.vue";
import BoardHeader from "./components/layout/BoardHeader.vue";
</script>

<style>
@import "./css/style.css";
</style>
