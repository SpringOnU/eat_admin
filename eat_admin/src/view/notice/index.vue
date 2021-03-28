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
          <FormItem label="school">
            <Select v-model="formAdd.school" style="width: 200px">
              <Option
                v-for="item in schoolList"
                :value="item.id"
                :key="item.id"
                >{{ item.title }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="Title">
            <Input v-model="formAdd.title"></Input>
          </FormItem>
          <FormItem label="content">
            <Input v-model="formAdd.content"></Input>
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
          <FormItem label="school">
            <Select v-model="formEdit.school" style="width: 200px">
              <Option
                v-for="item in schoolList"
                :value="item.id"
                :key="item.id"
                >{{ item.title }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="Title">
            <Input v-model="formEdit.title"></Input>
          </FormItem>
          <FormItem label="content">
            <Input v-model="formEdit.content"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { addNotice, getNotice, editNotice, delNotice, getSchool } from '@/api/data'

export default {
  name: 'index',
  components: {
    Tables
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      schoolList: [],
      formAdd: {
        title: '',
        content: '',
        school: ''
      },
      formEdit: {
        title: '',
        content: '',
        school: ''
      },
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        { title: 'title', key: 'title' },
        { title: 'content', key: 'content' },
        { title: 'schoolTitle', key: 'school_title' },
        { title: 'schoolId', key: 'school_id' },
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
                      this.editNotice(
                        params.row.id,
                        params.row.title,
                        params.row.content,
                        params.row.school_id
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
                      this.delNotice(params.row.id)
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
    handleSuccess () {
      console.log(1212)
    },
    handleSuccessEdit () {},
    ok () {
      this.addNotice()
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    okEdit () {
      this.editNoticeDate()
    },
    cancelEdit () {},
    editNotice (id, title, content, school) {
      // console.log(school);
      this.formEdit.title = title
      this.formEdit.content = content
      this.formEdit.school = school
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
    editNoticeDate () {
      let data = this.$qs.stringify({
        title: this.formEdit.title,
        content: this.formEdit.content,
        school: this.formEdit.school,
        id: this.editId
      })
      editNotice(data).then((res) => {
        if (res.data.code === 200) {
          this.getNotice()
        }
      })
    },
    getNotice () {
      getNotice().then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    getSchool () {
      getSchool().then((res) => {
        console.log(res.data.data)
        this.schoolList = res.data.data.length > 0 ? res.data.data : []
        // console.log(this.schoolList);
      })
    },
    addNotice () {
      console.log(this.formAdd.school)
      let data = this.$qs.stringify({
        title: this.formAdd.title,
        content: this.formAdd.content,
        school: this.formAdd.school
      })
      addNotice(data).then((res) => {
        if (res.data.code === 200) {
          this.getNotice()
        }
      })
    },
    delNotice (id) {
      let data = this.$qs.stringify({
        id: id
      })
      delNotice(data).then((res) => {
        if (res.data.code === 200) {
          this.getNotice()
        }
      })
    }
  },
  mounted () {
    this.getNotice()
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
