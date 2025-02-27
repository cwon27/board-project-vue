<template>
  <div class="float-right">
    <h2>QUICK MENU</h2>
    <ul>
      <li class="item1">
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
