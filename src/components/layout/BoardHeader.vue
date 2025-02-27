<template>
  <div class="header">
    <div class="div-utill"></div>
    <div class="head-inner">
      <h1 class="logo">
        <router-link to="/list" @click="search.resetSearch">
          초급자교육
        </router-link>
      </h1>
      <div class="gnb-wrap">
        <ul class="gnb">
          <li class="gnb1">
            <router-link to="/list" class="d1" @click="search.resetSearch">
              커뮤니티
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from "../../store/searchStore";

const search = useSearchStore();
</script>
