const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const check = require('../utils/check')

module.exports = {

  api: 'http://st.so.com/stu',

  extensions: ['jpg', 'png', 'webp', 'gif', 'bmp'],

  headers: {
    'User-Agent': `request/upimg-qihoo`
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let formData = {
      upload: fs.createReadStream(pathname),
    }

    let options = {
      url: this.api,
      formData,
      followRedirect: false,
      resolveWithFullResponse: true,
      simple: false
    }

    return request.post(options)
      .then(response => {
        if (response.statusCode !== 302) {
          throw new Error(`${response.statusCode}: ${response.statusMessage}`)
        }
        let location = response.headers.location
        let found = /imgkey=(\w*)\.jpg/.exec(location)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        return {
          url: `https://ps.ssl.qhmsg.com/${found[1]}.${info.type.ext}`,
          type: info.type
        }
      })
  }

}
