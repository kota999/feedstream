import axios from 'axios'

const FeedlyApi = {
  async getAuthHeader (token) {
    return {'Authorization': 'OAuth ' + token}
  },
  async authentication (token, thenFunc, catchFunc) {
    axios.get('https://cloud.feedly.com/v3/profile',
      {headers: await this.getAuthHeader(token)}
    )
      .then(thenFunc)
      .catch(catchFunc)
  },
  async getFeedStream (token, id, continuation, count, thenFunc, catchFunc) {
    axios.get('https://cloud.feedly.com/v3/streams/contents',
      {
        headers: await this.getAuthHeader(token),
        params: {
          'streamId': 'user/' + id + '/category/global.uncategorized',
          'unreadOnly': true,
          'continuation': continuation,
          'count': count
        }
      }
    )
      .then(thenFunc)
      .catch(catchFunc)
  },
  async setReadMarker (token, tag) {
    axios.post('https://cloud.feedly.com/v3/markers',
      {
        action: 'markAsRead',
        type: 'entries',
        entryIds: [
          tag
        ]
      },
      {headers: await this.getAuthHeader(token)}
    )
  }
}

export default FeedlyApi
