import { useMutation } from "@tanstack/vue-query";
import {
  deleteData,
  deleteFile,
  passwordCheck,
  saveBoard,
  updateBoard,
} from "../apis/service";
import type { BoardData, BoardDetail } from "../model/types";

//비밀번호 확인
export const usePwCheck = (
  boardNo: number,
  onSuccess: (response: any) => void
) => {
  return useMutation({
    mutationFn: (password: string) => passwordCheck(boardNo, password),
    onSuccess,
    onError: (error) => {
      alert("비밀번호 확인 중 오류 발생:" + error);
    },
  });
};

//글 삭제
export const useDelete = (
  boardNo: number,
  onSuccess: (response: any) => void
) => {
  return useMutation({
    mutationFn: () => deleteData(boardNo),
    onSuccess,
    onError: (error) => {
      alert("삭제 중 오류 발생" + error);
    },
  });
};

//기존 파일이면 삭제
export const useDeleteFile = () => {
  return useMutation({
    mutationFn: ({
      save_path,
      file_no,
    }: {
      save_path: string;
      file_no: number;
    }) => deleteFile(save_path, file_no),
  });
};

export const useWrite = (
  isUpdate: boolean,
  initialBoard: BoardDetail,
  files: Array<{ file: File | null }>
) => {
  return useMutation({
    mutationFn: (formData: BoardData) => {
      const filterdFile = files
        .map((item) => item.file)
        .filter((file): file is File => file !== null);

      console.log(files);
      console.log(filterdFile);
      console.log(formData);

      if (isUpdate) {
        if (!initialBoard.board_no) {
          throw new Error("게시글 번호가 없습니다.");
        } else {
          return updateBoard(initialBoard.board_no, formData, filterdFile);
        }
      } else {
        return saveBoard(formData, filterdFile);
      }
    },
  });
};
