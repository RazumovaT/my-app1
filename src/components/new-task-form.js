import { React, useState } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

function NewTaskForm({
  label,
  done,
  id,
  isEdit,
  createdAt,
  onDeleted,
  onItemDone,
  onItemEdit,
  onItemSubmit,
  onChange,
}) {
  const [input, setInput] = useState(label)

  const inputChange = (e) => {
    onChange(e.target.value)
    setInput(e.target.value)
  }

  const submitFunc = (e) => {
    e.preventDefault()
    onItemSubmit()
  }

  if (isEdit) {
    return (
      <form onSubmit={(e) => submitFunc(e)}>
        <input type="text" className="edit" value={input} onChange={inputChange} />
      </form>
    )
  }

  return (
    <label>
      <li className={done ? 'completed' : ''} onClick={onItemDone}>
        <div className="view">
          <input className="toggle" type="checkbox" name="checkbox" id={id} checked={done ? true : false} />
          <label htmlFor={id} onClick={onItemDone}>
            <span className="description">{label}</span>
            <span className="created">
              created{' '}
              {formatDistance(createdAt, Date.now(), {
                includeSeconds: true,
              })}{' '}
              ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onItemEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    </label>
  )
}

NewTaskForm.defaultProps = {
  label: '',
  done: false,
  id: Math.random(),
  onDeleted: () => {},
  onItemDone: () => {},
}

NewTaskForm.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  id: PropTypes.number,
  onDeleted: PropTypes.func,
  onItemDone: PropTypes.func,
}

export default NewTaskForm
