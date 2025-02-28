<template>
  <tr v-for="(item, i) in files" :key="i">
    <th class="fir file-style">
      첨부파일 {{ i + 1 }} <i class="req" v-if="i === 0">*</i>
    </th>
    <td colspan="3" class="file-style">
      <div class="file-display" v-if="item.file">
        <button
          class="ic-file2 fileBtn"
          v-if="item.fileData && item.fileData.file_no !== undefined"
          @click="handleDownload(item.fileData.file_no)"
        ></button>
        <span>{{ item.file.name || item.fileData?.origin_file_nm }}</span>
        <button class="file-del-btn" @click="handleRemove(i)">X</button>
      </div>
      <template v-else>
        <input
          type="file"
          style="display: none"
          :id="`file-${i}`"
          @change="handleFileChange(i, $event)"
        />
        <label :for="`file-${i}`" class="file-label">파일 선택</label>
      </template>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { FileData, FileItem } from "../../../model/types";
import { useDeleteFile } from "../../../hooks/useMutation";
import { handleDownload } from "../../../utils/boardUtils";

//props
const props = defineProps<{
  modelValue: FileItem[];
  existingFiles: FileData[];
  isUpdate: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", newFiles: FileItem[]): void;
}>();

//여기서 사용하는 파일 상태
const files = ref<FileItem[]>(props.modelValue || [{ file: null }]);

//수정상태일 때 파일 설정(기존 파일이 있는 경우)
watch(
  () => props.existingFiles,
  (existingFiles) => {
    if (existingFiles && existingFiles.length > 0) {
      const newFiles = new Array(3).fill({ file: null });

      //기존 파일 ord 값에 맞게 매치
      existingFiles.forEach((fileData) => {
        if (fileData.ord >= 1 && fileData.ord <= 3) {
          newFiles[fileData.ord - 1] = { file: new File([], ""), fileData };
        }
      });

      files.value = newFiles;

      //ord 문제로 인해 null이면 빈값으로 넣기
      const filterdFile = newFiles.map((item) => ({
        ...item,
        file: item.file === null ? new File([], "") : item.file,
      }));

      files.value = filterdFile;

      //부모한테 전송
      watch(files, (fileData) => {
        emit("update:modelValue", fileData);
      });
    }
  }
);

//파일 추가
const handleFileChange = (i: number, e: Event) => {
  const input = e.target as HTMLInputElement;

  //파일 선택되면?
  if (input.files && input.files[0]) {
    const newFiles = [...files.value];
    newFiles[i] = { file: input.files[0] };

    //파일 3개까지 첨부 가능
    if (newFiles.length < 3 && !newFiles.some((item) => item.file === null)) {
      newFiles.push({ file: null });
    }

    files.value = newFiles;

    //ord 문제로 인해 null이면 빈값으로 넣기
    const filterdFile = newFiles.map((item) => ({
      ...item,
      file: item.file === null ? new File([], "") : item.file,
    }));

    files.value = filterdFile;

    //부모한테 전송
    watch(files, (fileData) => {
      emit("update:modelValue", fileData);
    });
  }
};

//파일 삭제 요청 api
const { mutate: deleteMutaion } = useDeleteFile();

//파일 삭제
const handleRemove = (i: number) => {
  const fileToRemove = files.value[i];

  //기존 파일인지 확인
  if (fileToRemove.fileData) {
    const isConfirm = window.confirm(
      "정말 파일을 삭제하시겠습니까?(수정을 완료하지 않아도 파일이 삭제됩니다!)"
    );
    if (!isConfirm) return;

    //파일 삭제
    deleteMutaion(
      {
        save_path: fileToRemove.fileData.save_path,
        file_no: fileToRemove.fileData.file_no,
      },
      {
        onSuccess: () => {
          alert("파일 삭제 완료");
          updateFileList(i);
          window.location.reload();
        },
        onError: () => {
          alert("파일 삭제 실패");
        },
      }
    );
  } else {
    //새로 추가한 파일이면 그냥 목록에서 제거
    updateFileList(i);
  }
};

//파일 목록 업데이트
//수정이면 자리 유지, 등록이면 자리 변경(한개씩 위로 땡김)
const updateFileList = (i: number) => {
  let newFiles = [...files.value];

  if (props.isUpdate) {
    newFiles[i] = { file: null };
  } else {
    newFiles = files.value.filter((_, index) => index !== i);
  }

  //파일 3개까지 첨부 가능
  if (newFiles.length < 3 && !newFiles.some((item) => item.file === null)) {
    newFiles.push({ file: null });
  }

  files.value = newFiles;

  //file이 null인 값 보내면 안됨
  const filterdFile = newFiles.filter((item) => item.file !== null);

  files.value = filterdFile;

  //부모한테 전송
  watch(files, (fileData) => {
    emit("update:modelValue", fileData);
  });
};
</script>
