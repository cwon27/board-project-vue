<template>
  <div ref="editor" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { editorUploadImg } from "../../../apis/service";

//props
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

//<div ref="editor" />를 참조하기 위한 ref(DOM 요소 담을 ref)
const editor = ref();

//Toast Editor의 인스턴스를 저장하는 변수 -> getHTML 같은 메서드 호출시 사용
//에디터 객체를 저장하고 나중에 에디터 내용을 가져오거나 설정할 수 있음
let editorInstance: Editor | null = null;

onMounted(() => {
  editorInstance = new Editor({
    //여기서 Editor 인스턴스가 생성됨됨
    el: editor.value, // 실제 DOM 요소를 가져와서 Editor 인스턴스 생성함함
    height: "400px",
    initialEditType: "wysiwyg",
    placeholder: "내용을 입력해주세요.",
    previewStyle: "vertical",
    useCommandShortcut: false,
    language: "ko-KR",
    initialValue: props.modelValue,
    hooks: {
      addImageBlobHook: onUploadImage,
    },
  });

  //내용 변경시 부모에게 알림 -> emit
  editorInstance.on("change", () => {
    if (editorInstance) {
      emit("update:modelValue", editorInstance.getHTML());
    }
  });
});

//수정상태일 때 내용 변경
watch(
  () => props.modelValue,
  (newCont) => {
    if (editorInstance && newCont !== editorInstance.getHTML()) {
      console.log(newCont);
      editorInstance?.setHTML(newCont);
    }
  }
);

//이미지 업로드
const onUploadImage = async (
  blob: Blob | File,
  callback: (response: string, type: string) => void
) => {
  const response = await editorUploadImg(blob);
  callback(response, "image");
};
</script>
