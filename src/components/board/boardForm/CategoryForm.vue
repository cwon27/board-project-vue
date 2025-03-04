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
import { nextTick, ref, watch } from "vue";
import { useCategoryData } from "../../../hooks/useQuery";

//props
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

//api 호출
const { data: categories, isLoading, error } = useCategoryData();

//선택한 카테고리 값 -> 부모의 v-model과 연결
const selectedCategory = ref(props.modelValue);

//선택 값 변경시 부모에게 알림 -> emit
watch(selectedCategory, (newCategory) => {
  emit("update:modelValue", newCategory);
});

//수정상태일 때 카테고리값 변경 -> 해줘야 알맞게 변환됨
watch(
  () => props.modelValue,
  (newCategory) => {
    selectedCategory.value = newCategory;
  }
);

//focus
// const categoryRef = ref<HTMLSelectElement | null>(null);

// //부모에서 focus 사용할 수 있도록 하기
// const focus = () => {
//   console.log("categoryFocus 실행됨!" + categoryRef.value);
//   categoryRef.value?.focus();
// };

// //자식에서 선언된 함수 부모에서 사용할 수 있도록 해주는 함수(vue3)
// defineExpose({ focus });
</script>
