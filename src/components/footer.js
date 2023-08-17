import { React, Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from './task-filter'
// import { all, completed } from './filters'

export default class Footer extends Component {
  render() {
    const { itemsLeft, activeFilter, setActiveFilter, clearCompleted, all, active, completed } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TaskFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          all={all}
          active={active}
          completed={completed}
        />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  itemsLeft: undefined,
  activeFilter: 'All',
  setActiveFilter: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  setActiveFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}
