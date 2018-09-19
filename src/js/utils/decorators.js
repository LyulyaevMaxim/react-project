//функция fn выполнится лишь 1 раз
export function once(fn) {
  let returnValue
  let canRun = true
  return function runOnce() {
    if (canRun) {
      returnValue = fn.apply(this, arguments)
      canRun = false
    }
    return returnValue
  }
}

//функция fn вызовется лишь после "count"-вызовов
export function after(count, fn) {
  let runCount = 0
  return function runAfter() {
    runCount += 1
    if (runCount >= count) {
      return fn.apply(this, arguments)
    }
  }
}

//функция fn будет вызываться не чаще раза в interval
export function throttle(fn, interval) {
  let lastTime
  return function throttled() {
    const timeSinceLastExecution = Date.now() - lastTime
    if (!lastTime || timeSinceLastExecution >= interval) {
      fn.apply(this, arguments)
      lastTime = Date.now()
    }
  }
}

//функция fn будет выполняться с задержкой wait миллисекунд
export function debounce(fn, wait) {
  let timer
  return function debounced() {
    clearTimeout(timer)
    const args = arguments
    const that = this
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait)
  }
}
