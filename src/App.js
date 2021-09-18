import React from 'react'
import Modal from './modal'
import Composite from './composite'
import createMachine from './fms'
import screen from './screen'
import entry from './entry'
import shop from './shop'
import events from './events'
const map = {
  screen,
  shop
}
class Render extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [''],
      butt: [],
      things: [],
      area: 'hui',
      bag: [],
      displayModal: false,
      isspeak: false,
      com: {}
    }
  }

  componentDidMount() {
    const that = this
    this.entry = createMachine(entry, this)
    this.event = events(that)
    this.area = null
  }

  click(target) {
    const reg = new RegExp(/{{(.*?)}}/g)
    if(target.match(reg)) {
      const _target = RegExp.$1.split('.')
      const machine = _target[0]
      const state = _target[1]
      if (!this[machine]) {
        this[machine] = createMachine(map[machine], this)
      } else {
        this[machine].transition(state)
      }
    } else {
      const _target = RegExp.$1.split('.')
      const machine = _target[0]
      this[machine].transition(target)
    }
  }

  renderBt(b) {
    if (b.type === 'material') return this.renderBuy(b)
    return (
      <button title={b.des} disabled={this.state.isspeak} onClick={this.click.bind(this, b.click)}>{b.text}</button>
    )
  }

  buy(target) {
    this.event.say([ target.number >0 ? target.des : '卖光啦' ], 1000, this)
    this.event.buy(target, this.state.butt)
  }

  renderBuy(b) {
    return (
      <button onClick={this.buy.bind(this, b)}>{b.text}{` 剩余${b.number}`}</button>
    )
  }

  renderBags() {
    const { bag: _bag, com } = this.state;
    const bag = _bag.filter(b => b)
    return (
      <>
      {bag.map(e => <div className='bag'>{`${e.text} ${e.number}`}</div>)}
      {Object.values(com).map(e => <button className='bag'>{`${e.text} ${e.number}`}</button>)}
      </>
    )
  }

  composite() {
    this.setState({
      displayModal: true
    })
  }
  closeModal() {
    this.setState({
      displayModal: false
    })
  }

  make(el) {
    // make 
    const { main, text, id } = el
    const { bag: _bag, com: _com } = this.state;
    const bag = _bag.filter(b => b)
    const nbag = bag.map(mat => {
      if (main.includes(mat.id)) {
        // 如果被消耗
        mat.number--
      }
      if (mat.number === 0) {
        return undefined
      }
      return mat
    })
    if (_com[id] !== undefined && _com[id] !== null) {
      this.setState({
        com: {
          ..._com,
          [id]: {
            id,
            text,
            main,
            number: _com[id].number + 1
          }
        }
      })
    } else {
      this.setState({
        com: {
          ..._com,
          [id]: {
            id,
            text,
            main,
            number: 1
          }
        }
      })
    }
    this.setState({
      bag: nbag
    })
  }
  renderComposite() {
    const { bag: _bag } = this.state;
    const bag = _bag.filter(b => b).map(e => e.id)
    const cl = Composite.composite(bag)
    return (
      <div className="compositePanel">
        {cl.length > 0 ? cl.map(e => <button onClick={this.make.bind(this, e)} className='yb'>{e.text}</button>) : '暂无可以合成的东西，请先去收集物品'}
      </div>
    )
  }
  render(){
    const { text, butt, bag: _bag } = this.state;
    return (
      <>
        <p style={{color: '#1a2237'}}>一起制作中秋月饼吧</p>
        <div className="container">
          <div className='left'>
            {
              text.map(t => <p>{t}</p>)
            }
          </div>
          <div className='right'>
            {
              butt.map(b => {
                return this.renderBt(b)
              })
            }
          </div>
        </div>
        <div className='bags'>
            {this.renderBags()}
        </div>
        <button className='composite' onClick={this.composite.bind(this)}>合成</button>
        <Modal displayInfo={this.renderComposite.bind(this)} closeModal={this.closeModal.bind(this)} bag={this.state.bag} displayModal={this.state.displayModal}/>
      </>
    )
  }
}
export default Render;
