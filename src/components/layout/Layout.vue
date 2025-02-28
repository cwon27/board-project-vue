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
import BoardFooter from "./BoardFooter.vue";
import BoardHeader from "./BoardHeader.vue";
import FloatRight from "./FloatRight.vue";
import Menubar from "./Menubar.vue";
</script>
