import material from './data/material.json'
import { jsonTorender, jsontoObj  } from './util'
Object.keys(material).forEach(m =>{
  material[m].number = Math.floor(Math.random() * 10)
})
const _area = {
  initialState: 'init',
  init: {
    actions: {
      onEnter(_dep) {
        const that = _dep
        that.setState({
          text: ['诚心小卖部欢迎您的来到'],
          butt: jsonTorender(material).concat({
            text: '退出商店',
            click: '{{screen.hui}}'
          })
        })
      }
    },
    transitions: jsontoObj(material, 'init')((d) => {
      return {
        target: d,
        action: (_dep) => {
          console.log('购买中...', d)
        }
      }
    })
  }
}

export default _area
