<template>
  <p v-if="isUpdate && isLoading">로딩중...</p>
  <p v-else-if="error">수정 값 가져오는데 에러 발생</p>
  <Form
    v-else
    :isUpdate="isUpdate"
    :initialBoard="data?.boardDetail"
    :initialFile="data?.fileData"
  />
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import Form from "../../components/board/boardForm/Form.vue";
import { useBoardUpdate } from "../../hooks/useQuery";
//isUpdate props
const props = defineProps<{
  isUpdate: boolean;
}>();

//url 값 가져오기
const route = useRoute();
const boardNo = parseInt(route.params.board_no as string);

//수정 초기 데이터 가져오는 api 호출
const { data, isLoading, error } = useBoardUpdate(props.isUpdate, boardNo);
</script>
