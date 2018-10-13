const { shell } = require('electron')

const Utils = {
  jumpTo (url) {
    console.log(url)
    shell.openExternal(url)
  }
}

export default Utils
