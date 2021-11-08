<template>
  <div class="index">
    <div class="chat-box">
      <div class="friend">
        <div class="serach-user">在线用户</div>
        <div v-for="item in socketUserList" :key="item.account" class="friend-card">
          <div class="card-name"><p>{{ item.user_name }}</p></div>
          <div style="color: #1abb27;font-weight:400">在线</div>
        </div>
        <div v-show="socketUserList.length === 0" class="no-user-message">
          <p>当前无用户在线</p>
        </div>
      </div>
      <div class="chat">
        <div class="chat-head">消息</div>
        <div class="message-box">
          <div class="show-message">
            消息框
          </div>
          <div class="input-message">
            <el-input v-model="textarea" class="textarea" type="textarea" />
            <div class="input-button">
              <el-button type="primary">发送</el-button>
            </div>
          </div>
        </div>
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
    // this.getAllUser()
  },
  computed: {
    ...mapGetters(['userInfo', 'socketUserList'])
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
    // getAllUser() {
    //   window.$common.post('/api/getAllUser', {
    //     user_account: this.userInfo.user_account
    //   }).then(res => {
    //     // console.log(res)
    //     if (res.data.retCode === 1) {
    //       this.userOptions = res.data.result
    //     }
    //   })
    // },
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
  // background: url(../../assets/images/background.jpeg) repeat;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: center;
  .chat-box{
    background-color: #fff;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    // box-sizing: content-box;
    width: 800px;
    height: 550px;
    display: flex;
    .friend {
      border-right: 1px solid #b8b8b8;
      // padding: 5px 0px;
      width: 250px;
      .no-user-message{
        margin-top: 30px;
        text-align: center;
      }
      .serach-user{
        height: 49px;
        line-height: 49px;
        text-align: center;
        border-bottom: 1px solid #dddddd;
      }
      .friend-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 60px;
        .card-name{
          margin-left: 10px;
          p{
            font-size: 17px;
            font-weight: 500;
          }
        }
      }
      .friend-card:hover{
        background-color: rgb(228, 228, 228);
      }
    }
    .chat {
      flex: 1;
      .chat-head{
        height: 49px;
        line-height: 49px;
        text-align: center;
        border-bottom: 1px solid #dddddd;
      }
      .message-box{
        height: calc(100% - 49px);
        display: flex;
        flex-direction: column;
        .show-message{
          flex: 1;
        }
        .input-message{
          border-top:1px solid #dddddd;
          height: 180px;
          .input-button{
            height: calc(100% - 130px);
            margin-right: 10px;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
          }
          /deep/ .el-textarea__inner{
            height: 130px;
            resize: none;
            border: none;
          }
        }
      }
    }
  }
}
</style>
