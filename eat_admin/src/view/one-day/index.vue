<template>
  <div class="one_day">
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
        <Upload
          class="uplods"
          action="localhost"
          :before-upload="before"
          :on-success="handleSuccess"
        >
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <div class="forms">
          <Form :model="formAdd" label-position="right" :label-width="100">
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
            <FormItem label="link">
              <Input v-model="formAdd.link"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      title="Common Modal dialog box title"
      @on-ok="okEdit"
      @on-cancel="cancelEdit"
    >
      <div class="-body-content">
        <Upload
          class="uplods"
          action="localhost"
          :before-upload="beforeEdit"
          :on-success="handleSuccessEdit"
        >
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <div class="forms">
          <Form :model="formEdit" label-position="right" :label-width="100">
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
            <FormItem label="link">
              <Input v-model="formEdit.link"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import {
  addOneDay,
  getOneDay,
  editOneDay,
  delOneDay,
  getSchool
} from '@/api/data'

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
        link: '',
        school: ''
      },
      formEdit: {
        link: '',
        school: ''
      },
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        { title: 'link', width: 100, key: 'link', sortable: false },
        { title: 'schoolTitle', key: 'schoolName', width: 200 },
        { title: 'schoolId', key: 'schoolId', width: 200 },
        {
          title: 'src',
          key: 'src',
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
                    width: '450px',
                    height: '250px'
                  },
                  attrs: {
                    src: params.row.src
                  }
                },
                ''
              )
            ])
          },
          editable: false
        },
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
                      this.editOneDay(params.row.id, params.row.school_id)
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
                      this.delOneDay(params.row.id)
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
    before (file) {
      console.log(file)
      self.file = file
      if (file.size / 1000 > 2048) {
        // 限制文件的大小
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null // 超过大小将文件清空
      } else {
        // 读取文件的字符流
        const reader = new FileReader()
        // 将文件读取为 DataURL 以data:开头的字符串
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          this.codeImg = e.target.result
        }
      }
      return false
    },
    beforeEdit (file) {
      console.log(file)
      self.file = file
      if (file.size / 1000 > 2048) {
        // 限制文件的大小
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null // 超过大小将文件清空
      } else {
        // 读取文件的字符流
        const reader = new FileReader()
        // 将文件读取为 DataURL 以data:开头的字符串
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          this.codeImgEdit = e.target.result
        }
      }
      return false
    },
    handleSuccess () {
      console.log(1212)
    },
    handleSuccessEdit () {},
    ok () {
      this.addOneDay()
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    okEdit () {
      this.editOneDayDate()
    },
    cancelEdit () {},
    editOneDay (id, school) {
      this.modal2 = true
      this.editId = id
      this.formEdit.school = school
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    editOneDayDate () {
      let data = this.$qs.stringify({
        imgs: this.codeImgEdit,
        links: this.formEdit.link,
        school: this.formEdit.school,
        id: this.editId
      })
      editOneDay(data).then((res) => {
        if (res.data.code === 200) {
          this.getOneDay()
        }
      })
    },
    getOneDay () {
      getOneDay().then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    getSchool () {
      getSchool().then((res) => {
        console.log(res.data.data)
        this.schoolList = res.data.data.length > 0 ? res.data.data : []
        // console.log('aaa' + this.schoolList);
      })
    },
    
    addOneDay () {
      let data = this.$qs.stringify({
        imgs: this.codeImg,
        links: this.formAdd.link,
        school: this.formAdd.school
      })
      addOneDay(data).then((res) => {
        if (res.data.code === 200) {
          this.getOneDay()
        }
      })
    },
    delOneDay (id) {
      let data = this.$qs.stringify({
        id: id
      })
      delOneDay(data).then((res) => {
        if (res.data.code === 200) {
          this.getOneDay()
        }
      })
    }
  },
  mounted () {
    this.getOneDay()
    this.getSchool()
    // getTableData().then(res => {
    //   this.tableData = res.data
    //   console.log(res.data)
    // })
  }
}
</script>

<style>
.uplods {
  text-align: right;
}
</style>
