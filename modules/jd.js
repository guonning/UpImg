const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const randomInt = require('../utils/random')
const check = require('../utils/check')

module.exports = {

  api: 'https://search.jd.com/image?op=upload',

  extensions: ['jpg', 'png', 'bmp'],

  headers: {
    'User-Agent': `request/upimg-jd`
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
        let found = /callback\("(jfs.*)"\);/.exec(response)
        if (found === null) {
          throw new Error(`Upload Error`)
        }
        let r = randomInt(10, 14)
        return {
          url: `https://img${r}.360buyimg.com/img/${found[1]}`,
          type: info.type
        }
      })
  }

}
