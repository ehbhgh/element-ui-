<template>
  <div>
    <el-tree
      :data="treeList"
      default-expand-all
      :render-content="render"
      :expand-on-click-node="false"
    ></el-tree>
  </div>
</template>

<script>
import _ from "lodash";
import { isParent } from "../utils/index";
export default {
  namer: "WsTree",
  props: {
    data: {
      type: Array,
      default: [],
    },
    fileDrop: {
      type: Array,
      default: [],
    },
    directoryDrop: {
      type: Array,
      default: [],
    },
    delete: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.getTreeList();
  },
  data() {
    return {
      treeList: [],
      //当前编辑的id
      currentId: "",

      //当前编辑的内容
      currentContent: "",
    };
  },
  watch: {
    data() {
      this.getTreeList();
    },
  },
  methods: {
    getTreeList() {
      let allData = _.cloneDeep(this.data);
      const treeMapList = allData.reduce((memo, current) => {
        current.label = current.name;
        memo[current["id"]] = current;
        return memo;
      }, {});
      const result = allData.reduce((arr, current) => {
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current]);
        } else if (pid == 0) {
          arr.push(current);
        }
        return arr;
      }, []);
      this.treeList = result;
    },
    remove(id) {
      const allList = _.cloneDeep(this.data).filter((item) => item.id !== id);
      this.$emit("update:data", allList);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
    handleModify(data) {
      this.currentId = data.id;
      this.currentContent = data.name;
    },

    sure(data) {
      let list = _.cloneDeep(this.data).find((item) => item.id === data.id);
      list.name = this.currentContent;
      this.currentId = "";
      this.$emit("update:data", list);
      this.$message({
        type: "success",
        message: "修改成功!",
      });
    },
    cancel() {
      this.currentId = "";
    },
    handleRemove(data) {
      this.$confirm(`此操作将永久删除该文件${data.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete ? this.delete(data.id) : this.remove(data.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(data, res) {
      if (res == "rn") {
        this.handleModify(data);
      } else if (res == "rm") {
        this.handleRemove(data);
      }
    },
    handleInput(v) {
      this.currentContent = v;
    },
    render(h, { node, data, store }) {
      let list = isParent(data) ? this.directoryDrop : this.fileDrop;
      return (
        <div style={{ width: "100%" }}>
          {isParent(data) ? (
            node.expanded ? (
              <i class="el-icon-folder-opened"></i>
            ) : (
              <i class="el-icon-folder"></i>
            )
          ) : (
            <i class="el-icon-document"></i>
          )}
          {data.id == this.currentId ? (
            <el-input
              value={this.currentContent}
              on-input={this.handleInput}
            ></el-input>
          ) : (
            <span>{data.name}</span>
          )}

          {data.id != this.currentId ? (
            <el-dropdown
              on-command={this.handleClick.bind(this, data)}
              trigger="click"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {list.map((item) => {
                  return (
                    <el-dropdown-item command={item.text}>
                      {item.value}
                    </el-dropdown-item>
                  );
                })}
              </el-dropdown-menu>
            </el-dropdown>
          ) : (
            <span style={{ float: "right" }}>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-thumb"
                on-click={this.sure.bind(this, data)}
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                on-click={this.cancel}
              ></el-button>
            </span>
          )}
        </div>
      );
    },
  },
};
</script>

<style lang="less" scoped>
.el-tree {
  width: 50%;
}
/deep/.el-dropdown {
  float: right;
}
/deep/.el-input__inner {
  height: 30px;
}
/deep/ .el-input {
  height: 15px;
  width: 20%;
}
.el-tree-node {
  margin-top: 20px;
}
.el-button {
  height: 15px;
}
</style>