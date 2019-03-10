declare module '*.svg' {
  const content: any
  const ReactComponent: React.ComponentType<{}>
  export { content as default, ReactComponent }
}
