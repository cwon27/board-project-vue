<template>
  <p v-if="isLoading">로딩중...</p>
  <p v-else-if="error">카테고리 값 가져오는데 에러 발생</p>
  <select v-else v-model="selectedCategory" class="select" style="width: 150px">
    <option value="ALL">전체</option>
    <option
      v-for="category in categories"
      :key="category.comm_cd"
      :value="category.comm_cd"
    >
      {{ category.comm_cd_nm }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCategoryData } from "../../../hooks/useQuery";
import { useSearchStore } from "../../../store/searchStore";

//categoty 상태
const search = useSearchStore();
//api 호출
const { data: categories, isLoading, error } = useCategoryData();

//카테고리 text
const getCategoryName = (categoryCode: string) => {
  return categoryCode === "ALL"
    ? "전체"
    : categories.value?.find((category) => category.comm_cd === categoryCode)
        ?.comm_cd_nm || "전체";
};

//select 값
const selectedCategory = computed({
  get: () => search.searchCategoryType.comm_cd, // get: 전역적으로 저장돼있는 카테고리 상태값 가져오기
  set: (value: string) => search.updateCategory(value, getCategoryName(value)), // set: 카테고리 상태값 업데이트
});
</script>
