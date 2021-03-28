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
import { getOrderRefund } from '@/api/data'
import { formatDate, typeTo } from '@/uctil/uctil'

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
          title: '订单编号',
          key: 'orderNo',
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
                params.row.orderNo
              )
            ])
          },
          editable: false
        },
        {
          title: '订单类别',
          key: 'orderType',
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
                typeTo(params.row.orderType)
              )
            ])
          },
          editable: false
        },
        {
          title: '姓名',
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
          title: '性别',
          key: 'sex',
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
                params.row.sex
              )
            ])
          },
          editable: false
        },
        {
          title: '校区',
          key: 'school',
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
                params.row.school
              )
            ])
          },
          editable: false
        },
        {
          title: '学校',
          key: 'schoolName',
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
                params.row.schoolName
              )
            ])
          },
          editable: false
        },
        {
          title: '电话',
          key: 'phone',
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
                params.row.phone
              )
            ])
          },
          editable: false
        },
        {
          title: '价格',
          key: 'money',
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
                params.row.money
              )
            ])
          },
          editable: false
        },
        {
          title: '订单时间',
          key: 'orderTime',
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
                  new Date(Number(params.row.orderTime)),
                  'yyyy-MM-dd hh:mm'
                ) // params.row.orderTime
              )
            ])
          },
          editable: false
        },
        {
          title: '订单状态',
          key: 'state',
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
                params.row.state === 9 ? '已退款' : '未退款'
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
      this.getOrderRefund(this.info)
      // 返回顶部
      //  this.$refs.scoll.scrollTop = 0;
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    getOrderRefund (info) {
      let data = this.$qs.stringify({
        pageSize: info.pageSize,
        page: info.page
      })
      getOrderRefund(data).then((res) => {
        console.log(res)
        this.totals = res.data.total
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    }
  },
  mounted () {
    this.getOrderRefund(this.info)
    // this.getOrderRefund({page:2,pageSize:10,type:'all'});
  },
  computes: {

  }
}
</script>

<style >
.pageBtm {
  text-align: center;
  margin-top: 30px;
}
</style>
