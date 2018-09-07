import React from 'react'
const MyContext = React.createContext()

class MyContextProvider extends React.Component {
  state = {
    data: [],
    status: 'initial',
  }

  componentDidMount() {
    this.setState({ data: [1, 2, 3], status: 'success' })
  }

  render() {
    return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>
  }
}

export { MyContext, MyContextProvider }
