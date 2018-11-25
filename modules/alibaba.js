const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const randomInt = require('../utils/random')
const check = require('../utils/check')

module.exports = {

  api: 'https://kfupload.alibaba.com/mupload',

  extensions: ['jpg', 'png', 'gif'],

  headers: {
    'User-Agent': `request/upimg-alibaba`
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let formData = {
      file: fs.createReadStream(pathname),
      scene: 'aeMessageCenterV2ImageRule',
      name: path.basename(pathname)
    }

    let options = {
      url: this.api,
      formData,
      headers: this.headers,
      json: true
    }

    return request.post(options)
      .then(response => {
        if (response.code !== '0') {
          throw new Error(`Upload Error`)
        }
        return {
          url: response.url,
          type: info.type
        }
      })
  }

}
