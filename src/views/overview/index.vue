<template>
  <div class="index">
    <div class="userList">
      <el-select v-model="selectUser" placeholder="请选择">
        <el-option
          v-for="item in userOptions"
          :key="item.user_account"
          :label="item.user_name"
          :value="item.user_account"
        />
      </el-select>
    </div>
    <div class="chat">
      <div class="chat-box">
        消息框
      </div>
      <div class="chat-input">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="4"
        />
        <el-button :disabled="selectUser === ''" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      textarea: '',
      socket: null,
      sendUserName: 'aaa',
      selectUser: '',
      userOptions: []
    }
  },
  created() {
    // this.receiveMessage()
    this.$store.commit('websocket/webSocketInit')
    this.getAllUser()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 发送消息到服务器
    sendMessage() {
      if ('WebSocket' in window) {
        if (this.textarea === '') {
          return true
        } else {
          const data = {
            type: 1,
            user_account: this.userInfo.user_account,
            message: this.textarea,
            sendTo: this.selectUser
          }
          this.$store.commit('websocket/webSocketSend', data)
          // this.socket.send(JSON.stringify(data))
          this.textarea = ''
        }
      }
    },
    getAllUser() {
      window.$common.post('/api/getAllUser', {
        user_account: this.userInfo.user_account
      }).then(res => {
        // console.log(res)
        if (res.data.retCode === 1) {
          this.userOptions = res.data.result
        }
      })
    },
    receiveMessage() {
      if ('WebSocket' in window) {
        // 接收
        this.socket.onmessage = function(mes) {
          console.log(JSON.parse(mes.data))
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.index{
  display: flex;
  justify-content: space-around;
}
.chat{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .chat-box{
    border: 1px solid #DCDFE6;
    width:50vw;
    height: 400px;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .chat-input{
    margin-top: 0.5rem;
    width: 50vw;
  }
}

</style>
