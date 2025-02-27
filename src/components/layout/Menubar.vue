<template>
  <div class="lm">
    <h2 class="h2-tit">
      <strong>커뮤니티</strong>
    </h2>
    <ul class="snb">
      <li class="snb1 active">
        <router-link to="/list" @click="search.resetSearch">
          통합게시판
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from "../../store/searchStore";

const search = useSearchStore();
</script>
