<template>
    <div class="banner">
      <Card>
        <tables ref="tables" editable search-place="top" v-model="tableData" :columns="columns"/>
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>

    <Dropdown trigger="click">
      <a href="javascript:void(0)">
        1110
        <Icon :size="18" type="md-arrow-dropdown" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem v-for="item in schoolList" :value="item.id" :key="item.id" >{{item.title}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      </Card>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getUser, getSchool } from '@/api/data'

export default {
  name: 'index',
  components: {
    Tables
  },
  data () {
    schoolView: 'false'
    schoolList: []
    return {
      modal1: false,
      modal2: false,
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        { title: 'openid',
          key: 'openid',
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, params.row.openid)
            ])
          },
          editable: false },
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
        { title: 'schoolName',
          key: 'schoolName',
          render: (h, params) => {
            return h('div', [
              h("Dropdown", {
                style: {
                  marginLeft: "4px"
                },
                props: {
                  trigger: "click"
                }
              }, [
                h("a", {
                    on: {
                      click: () => {
                        alert(11)
                      }
                }
                }, [
                  h("span", params.row.schoolName),
                  h("Icon", {
                    props: {
                      type: "ios-arrow-down"
                    }
                  })
                ]),
                h("DropdownMenu", {
                  slot: "list"
                }, [
                  h("DropdownItem", {}, "11"),
                  h("DropdownItem", {}, "22")
                ])
              ])
            ])
          },
          editable: false },
        { title: 'nickName',
          key: 'nickName',
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, params.row.nickName)
            ])
          },
          editable: false },
        { title: 'gender',
          key: 'gender',
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, Number(params.row.gender) === 1 ? '男' : '女')
            ])
          },
          editable: false },
        { title: 'country',
          key: 'country',
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, params.row.country)
            ])
          },
          editable: false },
        { title: 'city',
          key: 'city',
          render: (h, params) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, params.row.city)
            ])
          },
          editable: false }
      ],
      tableData: []
    }
  },
  methods: {
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    getUser () {
      getUser().then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    getSchool () {
      getSchool().then((res) => {
        console.log(res.data.data)
        this.schoolList = res.data.data.length > 0 ? res.data.data : []
        console.log('aaa' + this.schoolList);
      })
    }
  },
  mounted () {
    this.getUser(),
    this.getSchool()
  }
}
</script>

<style scoped>

</style>
