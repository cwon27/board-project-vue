<style>
@import "./css/style.css";
</style>

<script>
import FloatRight from "./components/layout/FloatRight.vue";
import Menubar from "./components/layout/Menubar.vue";
import BoardFooter from "./components/layout/BoardFooter.vue";
import BoardHeader from "./components/layout/BoardHeader.vue";

export default {
  components: {
    Header,
    Menubar,
    FloatRight,
    Footer,
  },
};
</script>

<template>
  <div class="wrap">
    <BoardHeader />
    <div class="container">
      <Menubar />
      <div className="contents">
        <div class="location">
          <span className="ic-home">HOME</span>
          <span>커뮤니티</span>
          <em>통합게시판</em>
        </div>
        <div className="tit-area">
          <h3 className="h3-tit">통합게시판</h3>
        </div>
        <Outlet />
      </div>
    </div>
    <FloatRight />
    <BoardFooter />
  </div>
</template>
