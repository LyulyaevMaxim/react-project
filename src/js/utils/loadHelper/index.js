export const loadHelper = async ({ preloadModules = [], postModules = [], setState = () => {} }) => {
  await setState(state => ({ isAsyncModulesLoading: true }))
  setState({
    isAsyncModulesLoading: false,
    asyncModules: {
      ...(await loadModules(preloadModules)),
      ...(await loadModules(postModules)),
    },
  })
}

function loadModules(modules) {
  return Promise.all(modules.map(({ module }) => module.load())).then(res =>
    res.reduce((acc, currentModule, index) => {
      const { name, isDefault = true } = modules[index]
      return { ...acc, [name]: isDefault ? currentModule : currentModule[name] }
    }, {})
  )
}

export const sequentialLoader = async ({ modules, setState }) => {
  modules.forEach(async ({ module, name }) => {
    await module.load()
    setState(state => ({ asyncModules: { ...state.asyncModules, [name]: module } }))
  })
}
