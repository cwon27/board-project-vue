<template>
  <div class="paginate_complex" v-if="totalPages > 0">
    <button
      class="direction fir"
      @click="handlePageChange(1)"
      :disabled="currentPage === 1"
    >
      처음
    </button>
    <button
      class="direction prev"
      @click="handlePageChange(startBlock - 1)"
      :disabled="startBlock === 1"
    >
      이전
    </button>

    <!-- 페이지 목록 -->
    <template v-for="pageNum in visiblePages" :key="pageNum">
      <!-- 현재페이지 -->
      <strong v-if="pageNum === currentPage">{{ pageNum }}</strong>
      <!-- 다른페이지(클릭할 수 있어야함) -->
      <button v-else @click="handlePageChange(pageNum)">{{ pageNum }}</button>
    </template>

    <button
      class="direction next"
      @click="handlePageChange(endBlock + 1)"
      :disabled="endBlock === totalPages"
    >
      다음
    </button>
    <button
      class="direction last"
      @click="handlePageChange(totalPages)"
      :disabled="currentPage === totalPages"
    >
      끝
    </button>
    <div class="right">
      <select v-model="selectedPageSize" class="select" style="width: 120px">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearchStore } from "../../../store/searchStore";

const search = useSearchStore();

const props = defineProps<{
  totalPages: number;
}>();

//현재 페이지 -> 반응형 값으로 사용해야함
const currentPage = computed(() => search.page);

//페이지 갯수 정하기
const startBlock = computed(
  () => Math.floor((currentPage.value - 1) / 10) * 10 + 1
);

//최대 10개까지 표시
const endBlock = computed(() =>
  Math.min(startBlock.value + 9, props.totalPages)
);

//블록 단위로 페이지가 표시 되어야 하기 때문에 순회값 구하기
const visiblePages = computed(() =>
  Array.from(
    { length: endBlock.value - startBlock.value + 1 },
    (_, i) => startBlock.value + i
  )
);

//사이즈 타입 선택
const selectedPageSize = computed({
  get: () => search.pageSize, // get: 전역적으로 저장돼있는 카테고리 상태값 가져오기
  set: (value: number) => search.updatePageSize(value), // set: 카테고리 상태값 업데이트
});
const options = ref([
  { text: "10개씩 보기", value: 10 },
  { text: "30개씩 보기", value: 30 },
  { text: "50개씩 보기", value: 50 },
]);

//페이지 선택
const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    search.updatePage(newPage);
  }
};
</script>
