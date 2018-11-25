<p align="center">
<a href="https://www.npmjs.com/package/upimg">
<img src="https://user-images.githubusercontent.com/2666735/48976182-3dbbc080-f0bd-11e8-85f8-25533486dce1.png">
</a>
</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=flat-square"/></a>
<a href="https://www.npmjs.com/package/upimg"><img alt="Version" src="https://img.shields.io/npm/v/upimg.svg?style=flat-square"/></a>
<img alt="License" src="https://img.shields.io/npm/l/upimg.svg?style=flat-square"/>
</p>


## Usage

### Installation

```bash
npm install upimg
```
or
```bash
yarn add upimg
```

### Require module

```javascript
const upimg = require('upimg')
```

### Support servers

|server|url|
|:---:|---|
|alibaba|https://ae01.alicdn.com/kf/HTB1dYeZXZrrK1RjSspa763REXXaP.png|
|jd|https://img14.360buyimg.com/img/jfs/t27652/56/2185046614/6538/3a9cae42/5bfa42ccN6f124f96.png|
|qihoo|https://ps.ssl.qhmsg.com/t019da962bb7ae33344.png|
|smms|https://i.loli.net/2018/11/25/5bfa42f923fe8.png|
|sogou|https://img04.sogoucdn.com/app/a/100520146/601628d09da962bb7ae33344d1529303|


### Upload file

take `alibaba` for example

```javascript
upimg.alibaba.upload('./test/nodejs.png')
    .then(json => {
        console.log(json)
    })
    .catch(err => {
        console.error(err.message)
    })
```

success response
```json
{
    "url": "https://ae01.alicdn.com/kf/HTB1dYeZXZrrK1RjSspa763REXXaP.png",
    "type": {
        "ext": "png",
        "mime": "image/png"
    }
}
```

## Author

**upimg** © [metowolf](https://github.com/metowolf), Released under the [MIT](./LICENSE) License.<br>

> Blog [@meto](https://i-meto.com) · GitHub [@metowolf](https://github.com/metowolf) · Twitter [@metowolf](https://twitter.com/metowolf) · Telegram Channel [@metooooo](https://t.me/metooooo)
