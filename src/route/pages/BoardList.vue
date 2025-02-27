<template>
  <p v-if="isLoading">로딩중...</p>
  <p v-else-if="error">리스트 값 가져오는데 에러 발생</p>
  <div v-else>
    <Search @search="handleSearch" />
    <List
      :boardList="data?.boardList || []"
      :totalListAmount="data?.totalListAmount || 0"
    />
    <Pagination :totalPages="data?.totalPages || 0" />
    <div class="btn-box l mt30">
      <router-link to="/write" className="btn btn-green fr"> 등록 </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import List from "../../components/board/boardList/List.vue";
import Pagination from "../../components/board/boardList/Pagination.vue";
import Search from "../../components/board/boardList/Search.vue";
import { useBoardList } from "../../hooks/useQuery";
import { useSearchStore } from "../../store/searchStore";

//react와 동일하게 부모 컴포넌트에서 리스트 뽑기
//검색 조건 상태
const search = useSearchStore();

//검색 조건을 기준으로 리스트 뽑는 api 호출
const { data, isLoading, error } = useBoardList(search);

//검색할때마다 리스트가 바뀌어야하므로(api 다시 호출) queryClient 필요
const queryClient = useQueryClient();

//검색 실행
const handleSearch = () => {
  search.updatePage(1);
  queryClient.invalidateQueries({ queryKey: ["boardList"] });
};
</script>
