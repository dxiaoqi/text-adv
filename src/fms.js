function compose(len) {
  let _comArr = []
  return function push(status) {
    _comArr.push(status)
    if (_comArr.length > len) _comArr.shift()
    return _comArr.join('-')
  }
}
function createMachine(stateMachineDefinition, d) {
  const composeQueue = compose(stateMachineDefinition.compose && stateMachineDefinition.compose.max || 0)
  class Mechine {
    constructor(stateMachineDefinition, d) {
      this.value = stateMachineDefinition.initialState
      this._componseDefinition = stateMachineDefinition.compose
      this._compose = new Map()
      this._dep = d
      this._composeQueue = composeQueue  // 初始就不可修改
      stateMachineDefinition[this.value].actions.onEnter(d)
    }
    compose(c) {
      Object.keys(c).forEach(k => {
        this._compose.set(k, c[k])
      })
    }
    dep(d) {
      this._dep = d
    }
    transition(event) {
      const { value, _compose, _composeQueue, _componseDefinition, _dep } = this
      // 获取当前的MachineDefinition
      const currentStateDefinition = stateMachineDefinition[value]
      if(!currentStateDefinition.transitions) return
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) return
      // 读取对应的status,切换
      const targetStatus = destinationTransition.target
      // console.log(this)
      const destinationStateDefinition = stateMachineDefinition[targetStatus]
      // 执行上一次的退出任务
      destinationTransition && destinationTransition.action(_dep)
      currentStateDefinition.actions.onExit && currentStateDefinition.actions.onExit(_dep)
      // 如果包含连招，优先触发连招
      if (!!_componseDefinition && _componseDefinition.condition(_dep)) {
        const targetComp = _composeQueue(targetStatus)
        const action = _compose.get(targetComp)
        action && action()
      } else {
        destinationStateDefinition.actions.onEnter && destinationStateDefinition.actions.onEnter(_dep)
      }
      // 切换状态
      this.value = targetStatus
      return this.value
    }
  }
  return new Mechine(stateMachineDefinition, d)
}

export default createMachine
