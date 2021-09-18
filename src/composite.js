class Composite {
  constructor() {
    this.main= [1, 2, 4, 5]
    this.table = {
      mei: {
        id: 'mei',
        text: '梅干月饼',
        main: [3]
      },
      redBean: {
        id: 'redBean',
        text: '红豆月饼',
        main: [6]
      },
      guihua: {
        id: 'guihua',
        text: '桂花糕月饼',
        main: [8]
      }
    }
  }
  composite(list) {
    // [1,2,3,4]
    const main = this.main
    let result = []
    for (let i = 0; i< main.length; i++) {
      if (!list.includes(main[i])) {
        return result
      }
    }
    result.push({
      id: 'main',
      main: main,
      text: '普通月饼'
    })
    Object.values(this.table).forEach(e => {
      if (hasArr(e.main, list)) {
        result.push({
          id: e.id,
          main: main.concat(e.main),
          text: e.text
        })
      }
    })
    return result
  }
}

function hasArr(list, origin) {
  for (let i = 0; i< list.length; i++) {
    if (!origin.includes(list[i])) {
      return false
    }
  }
  return true
}

export default new Composite()