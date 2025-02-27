<template>
  <p v-if="isLoading">로딩중...</p>
  <p v-else-if="error">상세 값 가져오는데 에러 발생</p>
  <template v-else>
    <table class="write">
      <colgroup>
        <col style="width: 150px" />
        <col />
        <col style="width: 150px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th class="fir">작성자</th>
          <td>{{ data?.boardDetail.writer_nm }}</td>
          <th class="fir">작성일시</th>
          <td>{{ data?.boardDetail.reg_dt }}</td>
        </tr>
        <tr>
          <th class="fir">카테고리</th>
          <td colspan="3">{{ data?.boardDetail.comm_cd_nm }}</td>
        </tr>
        <tr>
          <th class="fir">제목</th>
          <td colspan="3">{{ data?.boardDetail.title }}</td>
        </tr>
        <tr>
          <th class="fir">내용</th>
          <td colspan="3" v-html="data?.boardDetail.cont"></td>
        </tr>
        <tr>
          <th class="fir">첨부파일</th>
          <td colspan="3">
            <span v-for="file in data?.fileData" :key="file.file_no">
              <button
                class="ic-file2 fileBtn"
                @click="handleDownload(file.file_no)"
              >
                {{ file.origin_file_nm }}
              </button>
              <br />
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="btn-box r">
      <button class="btn btn-green" @click="onPopup('edit')">수정</button>
      <button class="btn btn-red" @click="onPopup('delete')">삭제</button>
      <router-link
        to="/list"
        class="btn btn-default"
        @click="search.setBeforeSearch"
      >
        목록
      </router-link>
    </div>
  </template>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useBoardDetail } from "../../../hooks/useQuery";
import { handleDownload } from "../../../utils/boardUtils";
import { useSearchStore } from "../../../store/searchStore";

//url 값 가져오기
const route = useRoute();
const boardNo = parseInt(route.params.board_no as string);

//상세 데이터 가져오는 api 호출
const { data, isLoading, error } = useBoardDetail(boardNo);

//비밀번호 확인 팝업 띄우기
const onPopup = (action: string) => {
  const url = "/pwCheck/" + boardNo + "?action=" + action;
  window.open(
    url,
    "_blank",
    "width=500px, height=300px, left=600px, top=300px"
  );
};

//검색 조건 유지
const search = useSearchStore();
</script>
