import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import BoardList from "./pages/BoardList.vue";
import BoardDetail from "./pages/BoardDetail.vue";
import BoardForm from "./pages/BoardForm.vue";
import PwCheck from "./pages/PwCheck.vue";
// import App from "../App.vue";

const routes: RouteRecordRaw[] = [
  {
    //비번 체크
    path: "/pwCheck/:board_no",
    component: PwCheck,
  },
  {
    path: "/",
    children: [
      {
        //게시판 list
        path: "list",
        component: BoardList,
      },
      {
        //게시판 detail
        path: "detail/:board_no",
        component: BoardDetail,
      },
      {
        //게시판 create
        path: "write",
        component: BoardForm,
        props: {
          isUpdate: false,
        },
      },
      {
        //게시판 update
        path: "update/:board_no",
        component: BoardForm,
        props: {
          isUpdate: true,
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
