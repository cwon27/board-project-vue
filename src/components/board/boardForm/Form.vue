<template>
  <table class="write">
    <colgroup>
      <col style="width: 150px" />
      <col />
      <col style="width: 150px" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <th class="fir">작성자 <i class="req">*</i></th>
        <td>
          <input
            type="text"
            class="input block"
            v-model="formData.writer_nm"
            :readonly="isUpdate"
          />
        </td>
        <th class="fir">비밀번호 <i class="req">*</i></th>
        <td>
          <input
            type="password"
            class="input block"
            v-model="formData.password"
            :readonly="isUpdate"
          />
        </td>
      </tr>
      <tr>
        <th class="fir">카테고리 <i class="req">*</i></th>
        <td colspan="3">
          <CategoryForm v-model="formData.category_cd" />
        </td>
      </tr>
      <tr>
        <th class="fir">제목 <i class="req">*</i></th>
        <td colspan="3">
          <input
            type="text"
            class="input"
            style="width: 100%"
            v-model="formData.title"
          />
        </td>
      </tr>
      <tr>
        <th class="fir">내용 <i class="req">*</i></th>
        <td colspan="3">
          <ToastEditor v-model="formData.cont" />
        </td>
      </tr>
      <FileInput
        v-model="files"
        :existingFiles="existingFiles"
        :isUpdate="isUpdate"
      />
    </tbody>
  </table>

  <div class="btn-box r">
    <button class="btn btn-red" @click="handleSubmit">저장</button>
    <router-link
      to="/list"
      class="btn btn-default"
      @click="search.setBeforeSearch"
      >취소</router-link
    >
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import type { BoardDetail, FileData, FileItem } from "../../../model/types";
import { useSearchStore } from "../../../store/searchStore";
import ToastEditor from "./ToastEditor.vue";
import FileInput from "./FileInput.vue";
import CategoryForm from "./CategoryForm.vue";
import { useWrite } from "../../../hooks/useMutation";
import { useRouter } from "vue-router";

//props
const props = defineProps<{
  isUpdate: boolean;
  initialBoard: BoardDetail;
  initialFile: FileData;
}>();

//검색 조건
const search = useSearchStore();

//입력 폼 상태(등록? 수정?) 관리 -> reactive 사용(객체 반응형)
const formData = reactive({
  category_cd: "ALL",
  title: "",
  cont: "",
  writer_nm: "",
  password: "",
});

//파일 데이터 관리
//백엔드로 넘겨줄 파일
const files = ref<FileItem[]>([{ file: null }]);
// files가 업데이트될 때마다 로그 출력
watch(files, (newFiles) => {
  console.log("files 변경됨:", newFiles);
});
//기존 파일
const existingFiles = ref<FileData[]>([]);

//수정모드일 때 데이터 설정
onMounted(() => {
  if (props.isUpdate && props.initialBoard && props.initialFile) {
    Object.assign(formData, {
      category_cd: props.initialBoard.category_cd,
      title: props.initialBoard.title,
      cont: props.initialBoard.cont,
      writer_nm: props.initialBoard.writer_nm,
      password: "********",
    });

    existingFiles.value = Array.isArray(props.initialFile)
      ? props.initialFile
      : [props.initialFile];
  }
});

const router = useRouter();

//글, 파일 저장 & 수정 api
const { mutate: writeMutaion } = useWrite(props.isUpdate, props.initialBoard);

//글, 파일 저장 &  수정
const handleSubmit = () => {
  //유효성 검사
  //1. 작성자
  if (
    !props.isUpdate &&
    (!formData.writer_nm.trim() || formData.writer_nm.length > 50)
  ) {
    alert("작성자를 다시 입력해주세요! (필수로 입력, 50자 이내)");
    return;
  }
  //비번
  if (
    !props.isUpdate &&
    (!formData.password.trim() || formData.password.length > 100)
  ) {
    alert("비밀번호를 다시 입력해주세요! (필수로 입력, 100자 이내)");
    return;
  }
  //3. 카테고리
  if (formData.category_cd == "ALL") {
    alert("카테고리 타입을 선택하세요!");
    return;
  }
  //4. 제목
  if (!formData.title.trim() || formData.title.length > 200) {
    alert("제목을 다시 입력해주세요! (필수로 입력, 200자 이내)");
    return;
  }
  //5. 내용
  if (!formData.cont.trim()) {
    alert("내용을 입력해주세요! (필수로 입력)");
    return;
  }
  //6.첨부파일 1개 이상
  if (!files.value[0]?.file) {
    alert("파일은 1개 이상 선택해주세요!");
    return;
  }

  const isConfirm = window.confirm("글을 저장하시겠습니까?");
  if (!isConfirm) return;

  writeMutaion(
    //객체 형태로 전달
    { formData, files: files.value },
    {
      onSuccess: (response) => {
        if (response.success) {
          alert(
            props.isUpdate ? "글이 수정되었습니다." : "글이 저장되었습니다."
          );
          //검색 조건 초기화
          search.resetSearch();
          //목록으로 이동
          if (!props.isUpdate) {
            router.push("/list");
          } else {
            router.push(`/detail/${props.initialBoard.board_no}`);
          }
        } else {
          alert(
            props.isUpdate
              ? "글 수정을 실패했습니다."
              : "글 저장을 실패했습니다."
          );
        }
      },
      onError: (error) => {
        alert("글 등록 & 수정 실패" + error.message);
      },
    }
  );
};

//저장 버튼 클릭
</script>
