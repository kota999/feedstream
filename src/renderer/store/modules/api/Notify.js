import Push from 'push.js'
import FeedlyApi from './FeedlyApi.js'
const { shell } = require('electron')

const Notify = {
  async createNotifier (token, item, count, timeout) {
    if (Push.Permission.has()) {
      Push.create(item.title, {
        body: item.originId,
        timeout: count * timeout,
        tag: item.id,
        onClick: function (event) {
          console.log(this)
          shell.openExternal(this.body)
          FeedlyApi.setReadMarker(token, this.tag)
          this.close()
        }
      })
    }
  }
}

export default Notify
