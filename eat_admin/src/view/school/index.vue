<template>
  <div class="banner">
    <Card>
      <Button style="margin: 10px 0" type="primary" @click="modal1 = true"
        >添加</Button
      >
      <tables
        ref="tables"
        editable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <Button style="margin: 10px 0" type="primary" @click="exportExcel"
        >导出为Csv文件</Button
      >
    </Card>
    <Modal
      v-model="modal1"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="-body-content">
        <Form :model="formAdd" label-position="left" :label-width="100">
          <FormItem label="Title">
            <Input v-model="formAdd.title"></Input>
          </FormItem>
          <FormItem label="address">
            <!-- <Cascader
              v-model="formAdd.address"
              :data="data"
              filterable
            ></Cascader> -->
            <Input v-model="formAdd.address"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      title="Common Modal dialog box title"
      @on-ok="okEdit"
      @on-cancel="cancelEdit"
    >
      <div class="-body-content">
        <Form :model="formEdit" label-position="left" :label-width="100">
          <FormItem label="Title">
            <Input v-model="formEdit.title"></Input>
          </FormItem>
          <FormItem label="address">
            <!-- <Cascader
              v-model="formAdd.address"
              :data="data"
              filterable
            ></Cascader> -->
            <Input v-model="formEdit.address"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { addSchool, getSchool, editSchool, delSchool } from '@/api/data'

export default {
  name: 'index',
  components: {
    Tables
  },
  data () {
    return {
      data: [
        {
          value: '北京市',
          label: '北京市',
          children: [
            {
              value: '故宫',
              label: '故宫'
            },
            {
              value: '天坛',
              label: '天坛'
            },
            {
              value: '王府井',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ],
      modal1: false,
      modal2: false,
      formAdd: {
        title: '',
        address: ''
      },
      formEdit: {
        title: '',
        address: ''
      },
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        { title: 'title', key: 'title' },
        { title: 'address', key: 'address' },
        {
          title: 'Action',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editSchool(
                        params.row.id,
                        params.row.title,
                        params.row.address
                      )
                    }
                  }
                },
                'Edit'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delSchool(params.row.id)
                    }
                  }
                },
                'Delete'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    changeCa (e) {
      console.log(e)
    },
    handleSuccess () {
      console.log(1212)
    },
    handleSuccessEdit () {},
    ok () {
      this.addSchool()
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    okEdit () {
      this.editSchoolDate()
    },
    cancelEdit () {},
    editSchool (id, title, address) {
      this.formEdit.title = title
      this.formEdit.address = address
      this.modal2 = true
      this.editId = id
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    editSchoolDate () {
      // console.log(this.formEdit.address);
      //  let add = this.formEdit.address.join('');
      let data = this.$qs.stringify({
        title: this.formEdit.title,
        // address: add,
        address: this.formEdit.address,
        id: this.editId
      })
      editSchool(data).then((res) => {
        if (res.data.code === 200) {
          this.getSchool()
        }
      })
    },
    getSchool () {
      getSchool().then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    addSchool () {
      // let add = this.formAdd.address.join('');
      // console.log(add);
      let data = this.$qs.stringify({
        title: this.formAdd.title,
        address: this.formAdd.address
      })
      addSchool(data).then((res) => {
        if (res.data.code === 200) {
          this.getSchool()
        }
      })
    },
    delSchool (id) {
      let data = this.$qs.stringify({
        id: id
      })
      delSchool(data).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.getSchool()
        }
      })
    }
  },
  mounted () {
    this.getSchool()
    // getTableData().then(res => {
    //   this.tableData = res.data
    //   console.log(res.data)
    // })
  }
}
</script>

<style scoped>
</style>
