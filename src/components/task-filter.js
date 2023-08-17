import { Component, React } from 'react'
import PropTypes from 'prop-types'

export default class TaskFilter extends Component {
  render() {
    const { activeFilter, setActiveFilter, all, active, completed } = this.props
    const Filters = [all, active, completed]
    return (
      <ul className="filters">
        {Filters.map((filter) => {
          return (
            <li key={Math.random()}>
              <button
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? 'selected' : ''}
                type="button"
              >
                {filter}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  activeFilter: 'All',
  setActiveFilter: () => {},
}

TaskFilter.propTypes = {
  setActiveFilter: PropTypes.func,
}
