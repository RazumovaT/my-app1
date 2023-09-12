import { Component, React } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onInputChange = (e) => {
    e.preventDefault()
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    e.preventDefault()
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    e.preventDefault()
    this.setState({
      sec: e.target.value,
    })
  }

  onItemSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label, this.state.min, this.state.sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    return (
      // <form className="header" onSubmit={this.onItemSubmit}>
      //  <label>
      //     <input
      //       className="new-todo"
      //       placeholder="What needs to be done?"
      //       autoFocus
      //       value={this.state.label}
      //       onChange={this.onInputChange}
      //     />
      //   </label>
      // </form>
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onItemSubmit}>
          <label>
            <input
              className="new-todo"
              value={this.state.label}
              onChange={this.onInputChange}
              placeholder="Task"
              autoFocus
              required
            />
            <input
              className="new-todo-form__timer"
              value={this.state.min}
              onChange={this.onMinChange}
              placeholder="Min"
              pattern="[0-5]\d"
              autoFocus
              required
            />
            <input
              className="new-todo-form__timer"
              value={this.state.sec}
              onChange={this.onSecChange}
              placeholder="Sec"
              pattern="[0-5]\d"
              autoFocus
              required
            />
          </label>
          <button type="submit" onSubmit={this.onItemSubmit} />
        </form>
      </header>
    )
  }
}

Header.defaultProps = {
  onItemAdded: () => {},
}

Header.propTypes = {
  onItemAdded: PropTypes.func,
}
