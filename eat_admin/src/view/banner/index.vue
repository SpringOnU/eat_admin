<template>
    <div class="banner">
      <Card>
        <Button style="margin: 10px 0;" type="primary"  @click="modal1 = true">添加</Button>
        <tables ref="tables" editable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      </Card>
      <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="-body-content">
          <Upload
            action="localhost"
            :before-upload="before"
            :on-success="handleSuccess"
          >
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </div>
      </Modal>
      <Modal
        v-model="modal2"
        title="Common Modal dialog box title"
        @on-ok="okEdit"
        @on-cancel="cancelEdit">
        <div class="-body-content">
          <Upload
            action="localhost"
            :before-upload="beforeEdit"
            :on-success="handleSuccessEdit"
          >
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </div>
      </Modal>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { addBanner, getBanner, editBanner, delBanner } from '@/api/data'

export default {
  name: 'index',
  components: {
    Tables
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      codeImg: '',
      codeImgEdit: '',
      editId: '',
      columns: [
        { title: 'id', width: 100, key: 'id', sortable: false },
        { title: 'src',
          key: 'src',
          render: (h, params) => {
            return h('div', [
              h('img', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                attrs: {
                  src: params.row.src }
              }, '')
            ])
          },
          editable: false },
        {
          title: 'Action',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editBanner(params.row.id)
                  }
                }
              }, 'Edit'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delBanners(params.row.id)
                  }
                }
              }, 'Delete')
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
      if (file.size / 1000 > 2048) { // 限制文件的大小
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null // 超过大小将文件清空
      } else {
        // 读取文件的字符流
        const reader = new FileReader()
        // 将文件读取为 DataURL 以data:开头的字符串
        reader.readAsDataURL(file)
        reader.onload = e => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          this.codeImg = e.target.result
        }
      }
      return false
    },
    beforeEdit (file) {
      console.log(file)
      self.file = file
      if (file.size / 1000 > 2048) { // 限制文件的大小
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null // 超过大小将文件清空
      } else {
        // 读取文件的字符流
        const reader = new FileReader()
        // 将文件读取为 DataURL 以data:开头的字符串
        reader.readAsDataURL(file)
        reader.onload = e => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          this.codeImgEdit = e.target.result
        }
      }
      return false
    },
    handleSuccess () {
      console.log(1212)
    },
    handleSuccessEdit () {

    },
    ok () {
      this.addBanner()
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    okEdit () {
      this.editBannerDate()
    },
    cancelEdit () {

    },
    editBanner (id) {
      this.modal2 = true
      this.editId = id
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    editBannerDate () {
      let data = this.$qs.stringify({
        img: this.codeImgEdit,
        id: this.editId
      })
      editBanner(data).then(res => {
        if (res.data.code === 200) {
          this.getBanner()
        }
      })
    },
    getBanner () {
      getBanner().then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.length > 0 ? res.data.data : []
      })
    },
    addBanner () {
      let data = this.$qs.stringify({
        img: this.codeImg
      })
      addBanner(data).then(res => {
        if (res.data.code === 200) {
          this.getBanner()
        }
      })
    },
    delBanners (id) {
      let data = this.$qs.stringify({
        id: id
      })
      delBanner(data).then(res => {
        if (res.data.code === 200) {
          this.getBanner()
        }
      })
    }
  },
  mounted () {
    this.getBanner()
    // getTableData().then(res => {
    //   this.tableData = res.data
    //   console.log(res.data)
    // })
  }
}
</script>

<style scoped>

</style>
