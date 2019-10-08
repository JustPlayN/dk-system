import api from '../utils/api'

const state = {
  page: {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40],
    total: 0,
  },
  cityList: []
}

const mutations = {
  putPage (state, value) {
    state.page = {
      ...state.page,
      ...value
    }
  },
  putCityList (state, value) {
    state.cityList = value
  }
}

const actions = {
  putPage: ({ commit }, value) => commit('putPage', value),
  getCityList: ({ commit }, value) => {
    api.post('/physical-report/firstPage/cityMap', {
      data: {}
    }).then(res => {
      if (res.code === '00000') {
        commit('putCityList', res.data.cityList)
      } else {
        this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
      }
    })
    commit('putCityList', value)
  },
}

const getters = {
  page: state => state.page,
  cityList: state => state.cityList
}

export default {
  state,
  getters,
  actions,
  mutations
}
