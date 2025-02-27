import { defineStore } from "pinia";
import type { SearchData } from "../model/types";

export const useSearchStore = defineStore("search", {
  state: (): SearchData & { previousSearch: SearchData | null } => ({
    searchCategoryType: {
      comm_cd: "ALL",
      comm_cd_nm: "전체",
    },
    searchType: "all",
    searchKeyword: "",
    sortType: "latest",
    page: 1,
    pageSize: 10,

    previousSearch: null,
  }),
  actions: {
    // 검색 조건 초기화
    resetSearch() {
      this.$reset();
    },

    //검색조건 유지
    beforeSearch() {
      this.previousSearch = { ...this.$state };
    },
    setBeforeSearch() {
      if (this.previousSearch) {
        this.$patch({ ...this.previousSearch });
      }
    },

    //카테고리 업데이트
    updateCategory(categoryCode: string, categoryName: string) {
      this.searchCategoryType = {
        comm_cd: categoryCode,
        comm_cd_nm: categoryName,
      };
    },

    // 검색 타입 업데이트
    updateSearchType(searchType: string) {
      this.searchType = searchType;
    },

    // 검색 키워드 업데이트
    updateSearchKeyword(searchKeyword: string) {
      this.searchKeyword = searchKeyword;
    },

    // 정렬 타입 업데이트
    updateSortType(sortType: string) {
      this.page = 1;
      this.sortType = sortType;
    },

    // 페이지 업데이트
    updatePage(page: number) {
      this.page = page;
    },

    // 보기 갯수 업데이트
    updatePageSize(pageSize: number) {
      this.page = 1;
      this.pageSize = pageSize;
    },
  },
});
