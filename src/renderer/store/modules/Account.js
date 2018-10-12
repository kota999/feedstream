import storage from 'electron-json-storage-sync'
import FeedlyApi from './api/FeedlyApi.js'
import Notify from './api/Notify.js'

const state = {
  token: '',
  authenticated: false,
  account: {
    id: '',
    name: '',
    email: '',
    thumbnail: ''
  },
  continuation: '',
  feedNum: 3,
  timeout: 60000
}

const mutations = {
  setAccount (state, {id, name, email, thumbnail}) {
    state.account.id = id
    state.account.name = name
    state.account.email = email
    state.account.thumbnail = thumbnail
  },
  setToken (state, {token}) {
    state.token = token
  },
  setAuthenticated (state, {authenticated}) {
    state.authenticated = authenticated
  },
  setContinuation (state, {continuation}) {
    state.continuation = continuation
  },
  setFeedNum (state, {feedNum}) {
    state.feedNum = feedNum
  },
  setTimeout (state, {timeout}) {
    state.timeout = timeout
  }
}

const actions = {
  readToken (context) {
    console.log('readToken - start')
    const result = storage.get('token')
    if (result.status) {
      // do something with result.data
      context.commit('setToken', {token: result.data.access_token})
    } else {
      // handle result.error
      console.log(result.error)
    }
    console.log('readToken - finish')
  },
  writeToken (context, {token}) {
    console.log('writeToken - start')
    const result = storage.set('token', {access_token: token})
    console.log(result)
    if (result.status) {
      // data has been stored
    } else {
      // handle result.error
      console.log(result.error)
    }
    console.log('writeToken - finish')
  },
  readConf (context) {
    console.log('readConf - start')
    const result = storage.get('config')
    if (result.status) {
      context.commit('setFeedNum', {feedNum: result.data.feedNum})
      context.commit('setTimeout', {timeout: result.data.timeout})
    } else {
      console.log(result.error)
      console.log('Set default value, feedNum = 3, timeout = 60000')
      context.dispatch('writeConf', {feedNum: context.state.feedNum, timeout: context.state.timeout})
    }
    console.log('readConf- finish')
  },
  writeConf (context, {feedNum, timeout}) {
    console.log('writeConf- start')
    const result = storage.set('config', {feedNum: feedNum, timeout: timeout})
    console.log(result)
    if (result.status) {
      // data has been stored
    } else {
      // handle result.error
      console.log(result.error)
    }
    console.log('writeConf - finish')
  },
  async auth (context) {
    console.log('auth')
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      context.commit('setAuthenticated', {authenticated: false})
      console.log(context.state.token)
      FeedlyApi.authentication(context.state.token,
        function (response) {
          console.log(response)
          context.commit('setAccount', {
            id: response.data.id,
            name: response.data.fullName,
            email: response.data.email,
            thumbnail: response.data.picture
          })
          context.commit('setAuthenticated', {authenticated: true})
          // Let the calling function know that http is done. You may send some data back
          resolve(response)
        },
        function (error) {
          console.log('error')
          console.log(error)
          reject(error)
        }
      )
    })
  },
  async viewFeed (context) {
    console.log('viewFeed - start')
    await context.dispatch('readConf')
    const count = context.state.feedNum
    const timeout = context.state.timeout
    function notifyFeed () {
      if (context.state.authenticated) {
        FeedlyApi.getFeedStream(context.state.token, context.state.account.id, context.state.continuation, count,
          function (response) {
            console.log(response)
            if (response.data.continuation === undefined) {
              context.commit('setContinuation', {continuation: ''})
            } else {
              context.commit('setContinuation', {continuation: response.data.continuation})
            }
            let idx = 0
            function notify () {
              if (response.data.items.length !== 0) {
                Notify.createNotifier(context.state.token, response.data.items[idx], count, timeout)
                idx++
              }
              if (idx === response.data.items.length) {
                clearInterval(id2)
              }
            }
            notify()
            let id2 = setInterval(notify, timeout)
          },
          function (error) {
            console.log(error)
          }
        )
      }
    }
    notifyFeed()
    setInterval(notifyFeed, count * timeout)
  }
}

const getters = {
  token (state) {
    return state.account.token
  },
  authenticated (state) {
    return state.authenticated
  },
  id (state) {
    return state.account.id
  },
  name (state) {
    return state.account.name
  },
  email (state) {
    return state.account.email
  },
  thumbnail (state) {
    return state.account.thumbnail
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
