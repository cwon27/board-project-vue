<template>
  <div class="pop-wrap">
    <h1 class="pop-tit">비밀번호 확인</h1>
    <div class="pop-con">
      <table class="view">
        <colgroup>
          <col style="width: 100px" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>비밀번호</th>
            <td>
              <input
                type="password"
                class="input"
                style="width: 200px"
                v-model="password"
                ref="passwordRef"
              />
              <button class="btn btn-red" @click="handlePwCheck">확인</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btn-box">
        <button class="btn btn-default" @click="handleClose">닫기</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useSearchStore } from "../../store/searchStore";
import { useDelete, usePwCheck } from "../../hooks/useMutation";

//창 닫기
const handleClose = () => {
  window.close();
};

//url 값 가져오기 -> 동적 경로 변수수
const route = useRoute();
const boardNo = parseInt(route.params.board_no as string);

//비밀번호 값
const password = ref("");
const passwordRef = ref<HTMLInputElement | null>(null);

//action 값 가져오기 -> 쿼리스트링
const action = route.query.action;

//검색 조건 초기화
const search = useSearchStore();

//글 삭제 api
const deleteMutaion = useDelete(boardNo, (response) => {
  if (response.success) {
    alert("삭제가 완료되었습니다.");
    //검색조건 초기화
    search.resetSearch();
    //창 닫기
    window.close();

    if (window.opener) {
      window.opener.location.href = "/list";
    }
  } else {
    alert("삭제를 실패했습니다.");
  }
});

//비번 체크 api
const pwCheckMutaion = usePwCheck(boardNo, (response) => {
  if (response.success) {
    //비밀번호 일치
    if (action === "edit") {
      window.close();

      if (window.opener) {
        window.opener.location.href = `/update/${boardNo}`;
      }
    } else if (action === "delete") {
      const isConfirm = confirm("해당 글을 정말 삭제하시겠습니까?");

      if (isConfirm) {
        //삭제 진행
        deleteMutaion.mutate();
      }
    }
  } else {
    //비밀번호 불일치 => response.false인 경우
    alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.");
    password.value = "";
    passwordRef.value?.focus();
  }
});

//비밀번호 확인 버튼 클릭 함수
const handlePwCheck = () => {
  if (password.value.length <= 0 || password.value.length > 100) {
    alert("비밀번호를 다시 입력해주세요!");
    passwordRef.value?.focus();
    return;
  }

  pwCheckMutaion.mutate(password.value);
};
</script>
