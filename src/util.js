export const jsonTorender = _data => Object.keys(_data).map((d) => {
  const data = _data[d]
  return {
    ...data,
    click: data.click
  }
})

export const renderBack = data => data.concat({
  text: "返回",
  click: "{{screen.init}}"
})

export const jsontoObj = (data, cur) => fn => {
  let result = {
    [cur]: {
      target: cur,
      action: (_dep) => {
        console.log('购买中...', cur)
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  Object.keys(data).map((d) => {
    result[d] = fn(d)
  })
  return result
}