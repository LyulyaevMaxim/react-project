declare module '*.svg' {
  const content: any
  const ReactComponent: any //: React.ComponentType<{ }>
  export { content as default, ReactComponent }
}
