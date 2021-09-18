import { jsontoObj  } from './util'
const event = function(_dep) {
  return {
    buy(sth, material) {
      const that = _dep
      if (sth.number <= 0) {
        // 没有库存了
      } else {
        that.setState((state) => {
          let { bag: _bag, butt: _butt } = state
          let bag = JSON.parse(JSON.stringify(_bag))
          let butt = JSON.parse(JSON.stringify(_butt))
          if (bag[sth.id - 1] !== undefined && bag[sth.id - 1] !== null) {
            bag[sth.id - 1].number = bag[sth.id - 1].number + 1
          } else {
            bag[sth.id - 1] = {...sth, number: 1}
          }
          return {
            bag: bag,
            butt: butt.map(b => {
              if (b.id === sth.id) {
                b.number --
              }
              return b
            })
          }
        })
      }
    },
    say: function(textArr, lay, _dep, cb) {
      textArr.forEach((_text, i) => {
        // 聊天状态下不允许乱跑
        setTimeout(function() {
          _dep.setState(state => {
            const { text } = state
            text.push(_text)
            return {
              isspeak: true,
              text: text
            }
          })
          if (i === textArr.length - 1) {
            cb && cb()
            console.log('hi')
            _dep.setState({
              isspeak: false
            })
          }
        }, i * lay)
      })
    },
    unOpen: function(e) {
      this.say(['暂未开放，尽情期待'], 1000, _dep)
    },
    girl: function() {
      this.say([`双马尾小妹妹：今天早起去北郊采摘了一些特色，准备用来制作好吃的月饼，小geigei需要吗？`,
      `你：真的可以吗？`,
      `"双马尾小妹妹: 想的真美，我才不给你，想要的话，等游戏的下一版本吧，嘻嘻"
      `], 3000, _dep)
    },
    story: function(_dep) {
      this.say([`说书先生：月饼是久负盛名的汉族传统小吃之一，中秋节时令美食。
      其中京式、广式、苏式、潮式，滇式等月饼被中国南北各地的人们所喜爱。月饼圆又圆，
      又是合家分吃，象征着团圆和睦，在中秋节这一天是必食之品。古代月饼被作为祭品于中秋节所食。
      据说中秋节吃月饼的习俗于唐朝开始。北宋之时，在宫廷内流行，但也流传到民间，
      当时俗称“小饼”和“月团”。发展至明朝则成为全民共同买过的饮食习俗。
      时至今日，品种更加繁多，风味因地各异。`,
      `你：那月饼最早可以追溯到什么时候呢？`,
      `月饼在中国有着悠久的历史,据史料记载，早在殷、周时期，江、浙一带就有一种纪念太师闻仲的边薄心厚的 “太师饼”，
      此乃中国月饼的"始祖"
      `], 3000, _dep)
    },
    transition: function(target) {
      this[target](_dep)
    }
  }
}

export default event