import entry from './data/entry.json'
import events from './events'
const area = {
  initialState: 'init',
  init: {
    actions: {
      onEnter(_dep) {
        const that = _dep
        const event = events(that)
        event.say(['2021年9月', '你是嫦娥的一只小兔几', 
        `嫦娥：兔子啊兔子，又到了做月饼的时候了，如今这广寒宫还没装电子锁，我没办法出门，你懂吧，
        所以呀，就拜托你去下凡买点原料做点你喜欢吃的月饼吧！
        `,
        `
        ----------------嫦娥把你变了一个帅气的小伙子--------------
        `,'准备好去访名山，做月饼了嘛'], 2000, that, function(){
          that.setState({
            butt: [{
              text: "出发",
              click: "{{screen.init}}"
            }]
          })
        })
      },
      onExit() {
        // ...
      }
    },
    transitions: {
      find: {
        target: 'find',
        action: () => {
          // ....
        }
      }
    }
  }
}

export default area