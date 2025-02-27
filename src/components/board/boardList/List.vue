<template>
  <div class="tbl-hd noBrd mb0">
    <span class="total"
      >검색 결과 : <strong>{{ totalListAmount }}</strong> 건</span
    >
    <div class="right">
      <span class="spanTitle">정렬 순서 :</span>
      <select v-model="selectedSort" class="select" style="width: 120px">
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

  <table class="list default">
    <colgroup>
      <col style="width: 60px" />
      <col style="width: 80px" />
      <col />
      <col style="width: 80px" />
      <col style="width: 80px" />
      <col style="width: 80px" />
      <col style="width: 120px" />
    </colgroup>
    <thead>
      <tr>
        <th>No</th>
        <th>카테고리</th>
        <th>제목</th>
        <th>첨부파일</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>작성일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="boardList.length === 0">
        <td
          colspan="7"
          style="text-align: center; border: none; padding: 50px 0"
        >
          게시물이 존재하지 않습니다.
        </td>
      </tr>
      <tr v-else v-for="(board, i) in boardList" :key="board.board_no">
        <td>{{ rowNum(i) }}</td>
        <td>{{ board.comm_cd_nm }}</td>
        <td class="l">
          <router-link :to="`/detail/${board.board_no}`">
            {{ board.title }}
            <img v-if="board._new" src="/src/images/new.gif" class="new" />
          </router-link>
        </td>
        <td>
          <router-link
            v-if="board._file"
            :to="`/detail/${board.board_no}`"
            class="ic-file"
          >
          </router-link>
        </td>
        <td>{{ board.writer_nm }}</td>
        <td>{{ board.view_cnt }}</td>
        <td>{{ board.reg_dt }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearchStore } from "../../../store/searchStore";
import type { BoardList } from "../../../model/types";

const search = useSearchStore();

//select 박스 데이터 정의
const selectedSort = computed({
  get: () => search.sortType, // get: 전역적으로 저장돼있는 카테고리 상태값 가져오기
  set: (value: string) => search.updateSortType(value), // set: 카테고리 상태값 업데이트
});
const options = ref([
  { text: "최근 작성일", value: "latest" },
  { text: "조회수", value: "hit" },
]);

//검색 조건 기준 리스트 값 -> BoardList에서 props로 받음
const props = defineProps<{
  boardList: BoardList[];
  totalListAmount: number;
}>();

//게시글 번호 계산
const rowNum = (i: number) => {
  return props.totalListAmount - (search.page - 1) * search.pageSize - i;
};
</script>
