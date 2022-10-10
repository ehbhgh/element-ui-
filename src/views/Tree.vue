<template>
  <div>
    <ws-tree
      :data="treeList"
      v-if="treeList.length"
      :fileDrop="fileDrop"
      :directoryDrop="directoryDrop"
      :delete="deleteItem"
    ></ws-tree>
  </div>
</template>

<script>
import { getTreeList, deleteTreeList } from "../api/index";
import WsTree from "../components/WsTree.vue";
export default {
  name: "Tree",
  components: {
    WsTree,
  },
  data() {
    return {
      treeList: [],
      fileDrop: [{ text: "rm", value: "删除文件" }],
      directoryDrop: [
        { text: "rn", value: "修改文件名" },
        { text: "rm", value: "删除文件" },
      ],
    };
  },
  mounted() {
    this.getTreeList();
  },
  methods: {
    async getTreeList() {
      const {
        data:{ parent,children}
      } = await getTreeList();
      // console.log(data,'ws')
      parent.forEach((item) => (item.type = "parent"));
      const allList = [...parent, ...children];
      this.treeList = allList;
    },

    async deleteItem(id) {
     let data= await deleteTreeList(id);
     this.$message({
          message: data.data.msg,
          type: 'success'
        });
      this.getTreeList();
    },
  },
};
</script>

<style scoped>
</style>
