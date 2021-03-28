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
import { myInformation } from '@/api/data'

export default {
  name: 'OrderIndex',
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
          title: '真实姓名',
          key: 'realName',
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
                params.row.realName
              )
            ])
          },
          editable: false
        },
        {
          title: '联系电话',
          key: 'realPhone',
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
                params.row.realPhone
              )
            ])
          },
          editable: false
        },
        {
          title: '学号',
          key: 'realPStudent',
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
                params.row.realPStudent
              )
            ])
          },
          editable: false
        },
        {
          title: '学生证正面图片',
          key: 'realPOnImg',
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
                    width: '150px',
                    height: '150px'
                  },
                  attrs: {
                    src: params.row.realPOnImg
                  }
                },
                ''
              )
            ])
          },
          editable: false
        },
        {
          title: '学生证人面图片',
          key: 'realPOffImg',
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
                    width: '150px',
                    height: '150px'
                  },
                  attrs: {
                    src: params.row.realPOffImg
                  }
                },
                ''
              )
            ])
          },
          editable: false
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 切换页码
    handleCurrentChange (newPage) {
      this.info.page = newPage
      console.log(this.info.page)
      this.myInformation(this.info)
      // 返回顶部
      //  this.$refs.scoll.scrollTop = 0;
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    myInformation (info) {
      let data = this.$qs.stringify({
        pageSize: info.pageSize,
        page: info.page
      })
      myInformation(data).then((res) => {
        console.log(res)
        this.totals = res.data.total
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    }
  },
  mounted () {
    this.myInformation(this.info)
    // this.myInformation({page:2,pageSize:10});
  },
  computes: {}
}
</script>

<style >
.pageBtm {
  text-align: center;
  margin-top: 30px;
}
</style>
