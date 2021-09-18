import screen from './data/screen.json'
import area from './data/area.json'
import { jsonTorender, renderBack  } from './util'
const _screen = {
  initialState: 'init',
  init: {
    actions: {
      onEnter(_dep) {
        const that = _dep
        that.setState({
          text: ['请选择要到达的地域，可以通过把鼠标放置在地域上查看不同地区月饼的特色'],
          butt: jsonTorender(screen)
        })
      }
    },
    transitions: {
      hui: {
        target: 'hui',
        action: () => {
          console.log('到安徽')
          // ....
        }
      },
      su: {
        target: 'su',
        action: () => {
          console.log('到苏州')
          // ....
        }
      }
    }
  },
  hui: {
    actions: {
      onEnter(_dep) {
        const that = _dep
        const hasGirl = Math.floor(Math.random() * 10) < 5
        const hasstoryteller = Math.floor(Math.random() * 10) < 3
        that.setState({
          text: ['安徽欢迎您！'],
          butt: renderBack(jsonTorender(area['hui']).concat(
            hasGirl ? [{
              text: '刚从北郊回来的小妹妹',
              click: '{{event.girl}}'
            }]  : []
          ).concat(
            hasstoryteller ? [{
              text: '路过此地的说书人',
              click: '{{event.story}}'
            }]  : []          
          ))
        })
      }
    },
    transitions: {
      init: {
        target: 'init',
        action: () => {
          console.log('欢迎回到月宫')
          // ....
        }
      },
      hui: {
        target: 'hui',
        action: () => {
          console.log('欢迎回到安徽')
          // ....
        }
      }
    }
  },
  su: {
    actions: {
      onEnter(_dep) {
        const that = _dep
        that.setState({
          text: ['苏州欢迎您的来到'],
          butt: []
        })
      }
    },
    transitions: {
      init: {
        target: 'init',
        action: () => {
          console.log('欢迎回到月宫')
          // ....
        }
      }
    }
  }
}

export default _screen