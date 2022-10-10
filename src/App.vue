<template>
  <div >
    <tree/>
  </div>
</template>

<script>
import Tree from "./views/Tree.vue"
export default {
  name: "App",
  components: {
    Tree
  },
  data() {
    return {
      activeName: "输电检测",
      list: [
        {
          label: "输电检测",
          url: require("./assets/A.png"),
          notUrl: require("./assets/A1.png"),
        },
        {
          label: "变电",
          url: require("./assets/B.png"),
          notUrl: require("./assets/B1.png"),
        },
        {
          label: "配电台区",
          url: require("./assets/C.png"),
          notUrl: require("./assets/C1.png"),
        },
        {
          label: "配电站房",
          url: require("./assets/D.png"),
          notUrl: require("./assets/D1.png"),
        },
        {
          label: "用电采集",
          url: require("./assets/E.png"),
          notUrl: require("./assets/E1.png"),
        },
        {
          label: "智慧工地",
          url: require("./assets/F.png"),
          notUrl: require("./assets/F1.png"),
        },
        {
          label: "其他",
          url: require("./assets/G.png"),
          notUrl: require("./assets/G1.png"),
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped lang="less">
.content {
  display: flex;
  align-content: center;
  flex-direction: column;
  height: 100px;
}
.top {
  width: 100px;
  height: 50px;
  display: flex;
  align-content: center;
  justify-content: center;
  img {
  height: 47px;
}
}

.bottom {
  width: 100px;
  text-align: center;
  padding-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;

}
/deep/.el-tabs__item {
    color: #999999 ;
}
/deep/ .is-active{
  color: #08918C !important;
}
/* .el-tabs__item {
   height: 109px !important;
} */
</style>
