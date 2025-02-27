//Read시 필요한 BoardList
export interface BoardList {
  board_no: number;
  comm_cd_nm: string;
  title: string;
  writer_nm: string;
  view_cnt: number;
  reg_dt: string;
  _new: boolean;
  _file: boolean;
}

//검색 조건
//Category
export interface CategoryData {
  comm_cd: string;
  comm_cd_nm: string;
}

export interface SearchData {
  searchCategoryType: CategoryData;
  searchType: string;
  searchKeyword: string;
  sortType: string;
  page: number;
  pageSize: number;
}

//글 Creaete시 필요한 데이터
export interface BoardData {
  category_cd: string;
  title: string;
  cont: string;
  writer_nm: string;
  password: string;
}

//파일 데이터
export interface FileItem {
  file: File | null; //선택된 파일데이터
  fileData?: FileData; // 추가된 fileData 속성
}

//상세정보
export interface BoardDetail {
  board_no: number;
  comm_cd_nm: string;
  title: string;
  writer_nm: string;
  reg_dt: string;
  cont: string;
  category_cd: string;
}

//파일 데이터
export interface FileData {
  file_no: number;
  origin_file_nm: string;
  ord: number;
  save_path: string;
}

//글 update시 필요한한 데이터
export interface BoardUpdateData {
  board_no: number;
  category_cd: string;
  title: string;
  cont: string;
}
