const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const check = require('../utils/check')

module.exports = {

  api: 'https://sm.ms/api/upload',

  extensions: ['jpg', 'png', 'gif', 'bmp'],

  headers: {
    'User-Agent': `request/upimg-smms`
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let formData = {
      smfile: fs.createReadStream(pathname),
      ssl: 1,
      format: 'json'
    }

    let options = {
      url: this.api,
      formData,
      headers: this.headers,
      json: true
    }

    return request.post(options)
      .then(response => {
        if (response.code !== 'success') {
          throw new Error(`${response.code}: ${response.msg}`)
        }
        return {
          url: response.data.url,
          type: info.type
        }
      })
  }

}
