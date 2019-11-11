import api from '../utils/api'

const state = {
  page: {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40],
    total: 0,
  },
  cityList: [],
  userInfo: {},
  dpath: ''
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
  },
  putUserInfo (state, value) {
    state.userInfo = value
  },
  putDpath (state, value) {
    state.dpath = value
  }
}

const actions = {
  putPage: ({ commit }, value) => commit('putPage', value),
  putDpath: ({ commit }, value) => commit('putDpath', value),
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
  putUserInfo: ({ commit }, value) => commit('putUserInfo', value),
}

const getters = {
  page: state => state.page,
  dpath: state => state.dpath,
  cityList: state => state.cityList,
  userInfo: state => state.userInfo,
}

export default {
  state,
  getters,
  actions,
  mutations
}
