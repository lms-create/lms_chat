// const state = {
//   socket: null
// }

// const mutations = {
//   SET_USER_INFO: (state, userInfo) => {
//     state.userInfo = userInfo
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { account, password } = userInfo
//     return new Promise((resolve, reject) => {
//       window.$common.post('/api/login', {
//         username: account,
//         password
//       }).then(res => {
//         console.log(res)
//         if (res.data.retCode === 1) {
//           localStorage.setItem('token', res.data.result.token)
//           commit('SET_USER_INFO', res.data.result)
//           resolve()
//           // this.$message.success(res.data.message)
//         } else {
//           reject(res.data.message)
//           // this.$message.error(res.data.message)
//         }
//       })
//     })
//   },

//   // user logout
//   logout({ commit }) {
//     return new Promise((resolve, reject) => {
//       // commit('SET_TOKEN', '')
//       // removeToken()
//       localStorage.clear()
//       commit('SET_USER_INFO', null)
//       resetRouter()
//       resolve(null)
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       // commit('SET_TOKEN', '')
//       // removeToken()
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
