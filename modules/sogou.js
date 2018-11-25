const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const randomInt = require('../utils/random')
const check = require('../utils/check')

module.exports = {

  api: 'http://pic.sogou.com/pic/upload_pic.jsp',

  extensions: ['jpg', 'png', 'bmp', 'webp'],

  headers: {
    'User-Agent': `request/upimg-sogou`
  },

  maxsize: 5 * 1024 * 1024,

  async upload(pathname) {

    let info = check(
      pathname,
      this.extensions,
      this.maxsize
    )

    let formData = {
      file: fs.createReadStream(pathname)
    }

    let options = {
      url: this.api,
      formData,
      headers: this.headers
    }

    return request.post(options)
      .then(response => {
        let regex = /https?:\/\/img\d+\.sogoucdn.com\/app\/a\/\d+\/[0-9a-e]+/
        if (!regex.test(response)) {
          throw new Error(`Upload Error`)
        }
        return {
          url: response.replace('http://', 'https://'),
          type: info.type
        }
      })
  }

}
