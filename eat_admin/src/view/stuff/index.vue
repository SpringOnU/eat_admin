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
      title="丢失物品全部图片"
      cancel-text=""
      @on-ok="ok"
      width="800"
    >
      <!-- <div class="imgsShow">
        <img
          :src="item"
          alt="图片暂时丢失了"
          v-for="(item, index) in imgsShow"
          v-bind:key="index"
        />
      </div> -->
      <span>123123</span>
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
import Tables from '_c/tables'
import { getStuff } from '@/api/data'
import { formatDate, base64ToBlob, toBlobAll } from '@/uctil/uctil'

export default {
  name: 'OrderLose',
  components: {
    Tables
  },
  data () {
    return {
      totals: 0,
      info: {
        pageSize: 20,
        page: 1
      },
      modal1: false,
      modal2: false,
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      tableData: [],
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        {
          title: 'openid',
          key: 'openid',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.openid
              )
            ])
          },
          editable: false
        },
        {
          title: 'ioco',
          key: 'head_img',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '50px',
                    borderRadius: '50%'
                    // verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.head_img
                  }
                },
                'head_img'
              )
            ])
          },
          editable: false
        },
        {
          title: '用户名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.name
              )
            ])
          },
          editable: false
        },
        {
          title: '订单内容',
          key: 'text',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.text
              )
            ])
          },
          editable: false
        },
        // {
        //   title: "相关图片",
        //   key: "imgs",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "img",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small",
        //           },
        //           style: {
        //             marginRight: "5px",
        //             width: "50px",
        //             // borderRadius: "50%",
        //             verticalAlign: "middle",
        //           },
        //           attrs: {
        //             src: this.base64ImgtoFile(params.row.imgs),
        //           },
        //         },
        //         "head_img"
        //       ),
        //     ]);
        //   },
        //   editable: false,
        // },
        {
          title: '联系方式',
          key: 'contact',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.contact
              )
            ])
          },
          editable: false
        },
        {
          title: '订单时间',
          key: 'creater_time',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                formatDate(
                  new Date(Number(params.row.creater_time)),
                  'yyyy-MM-dd hh:mm'
                ) // params.row.orderTime
              )
            ])
          },
          editable: false
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
        }
      ],
      modalImgs: false,
      imgsShow: [],
    }
  },
  methods: {
    // 切换页码
    handleCurrentChange (newPage) {
      this.info.page = newPage
      console.log(this.info.page)
      this.getStuff(this.info)
      // 返回顶部
      //  this.$refs.scoll.scrollTop = 0;
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    getStuff (info) {
      let data = this.$qs.stringify({
        pageSize: info.pageSize,
        page: info.page
      })
      getStuff(data).then((res) => {
        console.log(res)
        // console.log(res.data.data[0].imgs);
        // let file = this.base64ImgtoFile(res.data.data[6].imgs,"image/png");
        // console.log("lklk");
        // console.log(file);
        this.totals = res.data.total
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    // 弹出图片
    lookImgs(imgs) {/* 
      let flag = base64ToBlob(imgs);
      let img = toBlobAll(imgs); */
      this.modalImgs = true;
      /* if (flag && img.length > 1) {
        this.modalImgs = true;
        this.imgsShow = [...img];
      } */
    },
    ok() {
      this.$Message.info("Clicked ok");
    }
    // 转换为图片
    //  base64ImgtoFile(data, type) {
    //      let urlData = data.split("|");
    //     let arr = urlData[0].split(',');
    //     let mime = arr[0].match(/:(.*?);/)[1] || type;
    //     // 去掉url的头，并转化为byte
    //     let bytes = window.atob(arr[1]);
    //     // 处理异常,将ascii码小于0的转换为大于0
    //     let ab = new ArrayBuffer(bytes.length);
    //     // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    //     let ia = new Uint8Array(ab);
    //     for (let i = 0; i < bytes.length; i++) {
    //         ia[i] = bytes.charCodeAt(i);
    //     }
    //     return new Blob([ab], {
    //         type: mime
    //     });
    // },
    // base64ImgtoFile(data, filename = "file") {
    //   let dataurl = data.split("|");
    //   let arr = dataurl[0].split(",");
    //   let mime = arr[0].match(/:(.*?);/)[1];
    //   let suffix = mime.split("/")[1];
    //   let bstr = atob(arr[1]);
    //   let n = bstr.length;
    //   let u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], `${filename}.${suffix}`, {
    //     type: mime,
    //   });
    // },
    
  },
  mounted () {
    this.getStuff(this.info)
    // this.getOrder({page:2,pageSize:10});
  }
}
</script>

<style>
.pageBtm {
  text-align: center;
  margin-top: 30px;
}
</style>
