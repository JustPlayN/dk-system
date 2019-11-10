<template>
  <div class="add-merchant">
    <el-form class="not-inline" ref="merchantForm" :rules="rules" :model="merchant" label-width="240px" size="medium">
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model.trim="merchant.userName" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="companyName">
        <el-input v-model.trim="merchant.companyName" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="merchant.sex" :label="1" :disabled="disabled">男</el-radio>
        <el-radio v-model="merchant.sex" :label="2" :disabled="disabled">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号：" prop="userPhone">
        <el-input v-model.trim="merchant.userPhone" maxlength="11" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="所在省：" prop="provinceId">
        <el-select v-model="merchant.provinceId" placeholder="请选择" @change="change($event, 1)" :disabled="disabled">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在市：" prop="cityId">
        <el-select v-model="merchant.cityId" placeholder="请选择" @change="change($event, 2)" :disabled="disabled">
          <el-option v-for="item in cityList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区：" prop="areaId">
        <el-select v-model="merchant.areaId" placeholder="请选择" :disabled="disabled">
          <el-option v-for="item in areaList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="addr">
        <el-input v-model.trim="merchant.addr" placeholder="请填写地址" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" autosize placeholder="请输入内容" :disabled="disabled" v-model.trim="merchant.remark" width="400px"></el-input>
      </el-form-item>
      <el-form-item label="绑定设备：" required>
        <el-checkbox-group v-model="deviceIndex" :disabled="disabled">
          <div v-for="(e, index) in equipments" :key="e.id" class="equip-row">
            <div style="width: 200px">
              <el-checkbox :label="index">{{e.deviceType}}</el-checkbox><br>
            </div>
            <div>
              <el-input-number class="input-number" width="100px" size="mini" :min="1" v-model="e.deviceNum" :disabled="disabled"></el-input-number>
            </div>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="disabled">
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="$router.back()">取消并返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      merchant: {
        userPhone: '',
        sex: 1,
        userName: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        addr: '',
        remark: '',
        companyName: '',
        deviceList: []     // 后端返回选中的设备及数量
      },
      provinceList: [],
      cityList: [],
      areaList: [],
      companyList: [],
      equipments: [],
      deviceIndex: [],      // 选中的设备在equipmens中的下标index
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: '请选择区', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change (value, type) {
      if ((!value)) {
        return
      }
      if (type === 1) {
        this.merchant.cityId = ''
        this.merchant.areaId = ''
      } else if (type === 2) {
        this.merchant.areaId = ''
      }
      this.getList(value, type)
    },
    getList (value, type) {
      this.$api.post('/physical-report/region/list', {
        data: {
          parentId: value
        }
      }).then(res => {
        if (res.code === '00000') {
          if (type === 0) {
            this.provinceList = res.data
          } else if (type === 1) {
            this.cityList = res.data
          } else {
            this.areaList = res.data
          }
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getCompanyList () {
      this.$api.post('/physical-report/class/list', {
        data: 0
      }).then(res => {
        if (res.code === '00000') {
          this.companyList = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getEquipments () {
      this.$api.post('/physical-report/device/attribute/list', {
        data: 0
      }).then(res => {
        if (res.code === '00000') {
          let eObj = {}
          this.merchant.deviceList.map(a => {        // 已选中的设备已id为key，nubmer为value转为Object
            eObj[a.id] = a.deviceNum
          })
          this.equipments = res.data.map((item, index) => {
            if (eObj[item.id]) {                    // 此设备是否被选中
              this.deviceIndex.push(index)
              return {
                ...item,
                deviceNum: eObj[item.id]
              }
            } else {
              return {
                ...item,
                deviceNum: 1
              }
            }
          })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getMerchantInfo () {
      let id = this.$route.query.id
      if (!id) {
        return
      }
      this.$api.post('/physical-report/supplier/detail', {
        data: { id }
      }).then(res => {
        if (res.code === '00000') {
          this.merchant = res.data
          this.getList(this.merchant.provinceId, 1)
          this.getList(this.merchant.cityId, 2)
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    editMerchant () {
      if (!/^1\d{10}/.test(this.merchant.userPhone)) {
        this.$message({ message: '请输入正确的手机号', type: 'error' })
        return
      } else if (this.deviceIndex.length === 0) {
        this.$message({ message: '请选则绑定设备及数量', type: 'error' })
        return
      }
      let list = this.deviceIndex.map(i => {
        return {
          id: this.equipments[i].id,
          deviceNum: this.equipments[i].deviceNum
        }
      })
      this.$api.post('/physical-report/supplier/edit', {
        data: {
          id: this.$route.query.id,
          userName: this.merchant.userName,
          sex: this.merchant.sex,
          userPhone: this.merchant.userPhone,
          provinceId: this.merchant.provinceId,
          cityId: this.merchant.cityId,
          areaId: this.merchant.areaId,
          addr: this.merchant.addr,
          remark: this.merchant.remark,
          companyName: this.merchant.companyName,
          deviceList: list
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$message({ message: '编辑成功', type: 'success' })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    addMerchant () {
      if (!/^1\d{10}/.test(this.merchant.userPhone)) {
        this.$message({ message: '请输入正确的手机号', type: 'error' })
        return
      } else if (this.deviceIndex.length === 0) {
        this.$message({ message: '请选则绑定设备及数量', type: 'error' })
        return
      }
      let list = this.deviceIndex.map(i => {
        return {
          id: this.equipments[i].id,
          deviceNum: this.equipments[i].deviceNum
        }
      })
      this.$api.post('/physical-report/supplier/add', {
        data: {
          userName: this.merchant.userName,
          sex: this.merchant.sex,
          userPhone: this.merchant.userPhone,
          provinceId: this.merchant.provinceId,
          cityId: this.merchant.cityId,
          areaId: this.merchant.areaId,
          addr: this.merchant.addr,
          remark: this.merchant.remark,
          companyName: this.merchant.companyName,
          deviceList: list
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$router.back()
          this.$message({ message: '添加成功', type: 'success' })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    submit () {
      this.$refs['merchantForm'].validate((valid) => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
      if (this.$route.query.id) {
        this.editMerchant()
      } else {
        this.addMerchant()
      }
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getMerchantInfo()
    this.getCompanyList()
    this.getEquipments()
    this.getList(0, 0)
    this.disabled = !!this.$route.query.type
  }
}
</script>

<style lang="less" scoped>
.add-merchant {
  padding-top: 80px;
}
.equip-row {
  display: flex;
  align-items: center;
}
</style>
