<template>
  <div class="banner">
    <Card>
      <tables
        ref="tables"
        editable
        search-place="top"
        v-model="tableData"
        :columns="columns"
      />
      <Button style="margin: 10px 0" type="primary" @click="exportExcel"
        >导出为Csv文件</Button
      >
    </Card>
    <Modal
      v-model="modalImgs"
      title="Common Modal dialog box title"
      cancel-text=""
      @on-ok="ok"
      width="800"
    >
      <div class="imgsShow">
        <img
          :src="item"
          alt="图片暂时丢失了"
          v-for="(item, index) in imgsShow"
          v-bind:key="index"
        />
      </div>
    </Modal>
    <Page
      :total="totals"
      show-total
      @on-change="handleCurrentChange"
      class="pageBtm"
      :page-size="info.pageSize"
    />
  </div>
</template>

<script>
import Tables from "_c/tables";
import { feedbackList } from "@/api/data";
import { typeToAdvice, base64ToBlob, toBlobAll } from "@/uctil/uctil";

export default {
  name: "OrderIndex",
  components: {
    Tables,
  },
  data() {
    return {
      totals: 0,
      info: {
        pageSize: 20,
        page: 1,
      },
      modal1: false,
      modal2: false,
      codeImg: "",
      codeImgEdit: "",
      editId: "",
      columns: [
        { title: "id", width: 100, key: "id", sortable: false },
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                },
                params.row.name
              ),
            ]);
          },
          editable: false,
        },
        {
          title: "问题类型",
          key: "type",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                },
                typeToAdvice(params.row.type)
              ),
            ]);
          },
          editable: false,
        },
        {
          title: "内容",
          key: "content",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                },
                params.row.content
              ),
            ]);
          },
          editable: false,
        },
        {
          title: "实例图片",
          key: "imgs",
          render: (h, params) => {
            return h("div", [
              h(
                "img",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    width: "150px",
                    height: "150px",
                  },
                  attrs: {
                    src: base64ToBlob(params.row.imgs),
                  },
                },
                ""
              ),
            ]);
          },
          editable: false,
        },
        {
          title: "Action",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.lookImgs(params.row.imgs);
                    },
                  },
                },
                "更多"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      modalImgs: false,
      imgsShow: [],
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    // 弹出图片
    lookImgs(imgs) {
      let flag = base64ToBlob(imgs);
      let img = toBlobAll(imgs);
      if (flag && img.length > 1) {
        this.modalImgs = true;
        this.imgsShow = [...img];
      }
    },
    // 切换页码
    handleCurrentChange(newPage) {
      this.info.page = newPage;
      console.log(this.info.page);
      this.feedbackList(this.info);
      // 返回顶部
      //  this.$refs.scoll.scrollTop = 0;
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    feedbackList(info) {
      let data = this.$qs.stringify({
        pageSize: info.pageSize,
        page: info.page,
      });
      feedbackList(data).then((res) => {
        console.log(res);
        this.totals = res.data.total;
        this.tableData = res.data.data.length > 0 ? res.data.data : [];
      });
    },
  },
  mounted() {
    this.feedbackList(this.info);
    // this.feedbackList({page:2,pageSize:10,type:'all'});
  },
  computes: {},
};
</script>

<style >
.pageBtm {
  text-align: center;
  margin-top: 30px;
}

.imgsShow {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.imgsShow img {
  width: 150px;
  height: 150px;
}
</style>
