<template>
  <div class="hide-dv mt10">
    <table class="view">
      <colgroup>
        <col style="width: 150px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>카테고리</th>
          <td>
            <Category />
          </td>
        </tr>
        <tr>
          <th>검색어</th>
          <td>
            <select
              v-model="selectedSearch"
              class="select"
              style="width: 150px"
            >
              <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <input
              type="text"
              class="input"
              style="width: 300px"
              v-model="searchKeyword"
              @keydown.enter="$emit('search')"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="btn-box btm l">
    <button class="btn btn-red fr" @click="$emit('search')">검색</button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearchStore } from "../../../store/searchStore";
import Category from "../Category.vue";

const search = useSearchStore();

//select 박스 데이터 정의
const selectedSearch = computed({
  get: () => search.searchType, // get: 전역적으로 저장돼있는 카테고리 상태값 가져오기
  set: (value: string) => search.updateSearchType(value), // set: 카테고리 상태값 업데이트
});
const options = ref([
  { text: "전체", value: "all" },
  { text: "제목", value: "title" },
  { text: "내용", value: "cont" },
  { text: "제목+내용", value: "titleCont" },
  { text: "작성자명", value: "writer" },
]);

//검색 키워드
const searchKeyword = computed({
  get: () => search.searchKeyword,
  set: (value: string) => search.updateSearchKeyword(value),
});
</script>
