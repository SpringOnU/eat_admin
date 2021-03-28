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
import { withdrawalList } from '@/api/data'

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
          title: '用户名',
          key: 'nickName',
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
                params.row.nickName
              )
            ])
          },
          editable: false
        },
        { title: 'ioco',
          key: 'ioco',
          render: (h, params) => {
            return h('div', [
              h('img', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  width: '50px',
                  borderRadius: '50%',
                  verticalAlign: 'middle'
                },
                attrs: {
                  src: params.row.avatarUrl
                }
              }, 'ioco')
            ])
          },
          editable: false },
        {
          title: '国家',
          key: 'country',
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
                params.row.country
              )
            ])
          },
          editable: false
        },
        {
          title: '城市',
          key: 'city',
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
                params.row.city
              )
            ])
          },
          editable: false
        },
        {
          title: '性别',
          key: 'gender',
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
                Number(params.row.gender) === 1 ? '男' : '女'
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
          title: '用户申请提现金额',
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
          title: '实际到账金额',
          key: 'realMoney',
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
                params.row.realMoney
              )
            ])
          },
          editable: false
        },
        {
          title: '订单状态',
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
                params.row.openid ? '提现成功' : '提现失败'
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
      this.withdrawalList(this.info)
      // 返回顶部
      //  this.$refs.scoll.scrollTop = 0;
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    withdrawalList (info) {
      let data = this.$qs.stringify({
        pageSize: info.pageSize,
        page: info.page
      })
      withdrawalList(data).then((res) => {
        console.log(res)
        this.totals = res.data.total
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    }
  },
  mounted () {
    this.withdrawalList(this.info)
    // this.withdrawalList({page:2,pageSize:10,type:'all'});
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
