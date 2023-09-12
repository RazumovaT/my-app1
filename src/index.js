import { React, Component } from 'react'
import { createRoot } from 'react-dom/client'

import Header from './components/header'
import ToDoList from './components/todo-list'
import Footer from './components/footer'
import { all, active, completed } from './components/filters'

const root1 = document.getElementById('root1')
const root = createRoot(root1)

class AppElements extends Component {
  minId = 0

  state = {
    data: [],
    filteredArr: [],
    activeFilter: all,
  }

  setActiveFilter = (filterName) => {
    switch (filterName) {
      case all:
        this.setState(({ data }) => {
          return {
            filteredArr: data,
            activeFilter: filterName,
          }
        })
        break
      case active:
        this.setState(({ data }) => {
          const filteredArr = data.filter((el) => !el.done)
          return {
            filteredArr: filteredArr,
            activeFilter: filterName,
          }
        })
        break
      case completed:
        this.setState(({ data }) => {
          const filteredArr = data.filter((el) => el.done)
          return {
            filteredArr: filteredArr,
            activeFilter: filterName,
          }
        })
        break
      default:
        break
    }
  }
  createItem(label, min, sec) {
    return {
      label,
      done: false,
      active: true,
      isEdit: false,
      min,
      sec,
      id: this.minId++,
      createdAt: Date.now(),
    }
  }

  addItem = (text, min, sec) => {
    if (!text.length) {
      return
    }
    const newItem = this.createItem(text, min, sec)
    this.setState(({ data }) => {
      const copy = JSON.parse(JSON.stringify(data))
      const newArr = [...copy, newItem]
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((el) => el.id === id)
      const newArr = JSON.parse(JSON.stringify(data))
        .slice(0, index)
        .concat(JSON.parse(JSON.stringify(data)).slice(index + 1))
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  itemDone = (id) => {
    this.setState(({ data }) => {
      let newArr = data.map((el) => (el.id === id ? { ...el, done: !el.done } : { ...el }))
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  itemEdit = (id) => {
    this.setState(({ data }) => {
      let newArr = data.map((el) => (el.id === id ? { ...el, isEdit: !el.isEdit } : { ...el }))
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ data }) => {
      const newArr = data.filter((el) => !el.done)
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  onItemSubmit = (id, text) => {
    this.setState(({ data }) => {
      let newArr = data.map((el) =>
        el.id == id ? { ...el, label: text, isEdit: !el.isEdit, done: !el.done } : { ...el }
      )
      return {
        data: newArr,
        filteredArr: newArr,
      }
    })
  }

  render() {
    const itemsLeft = this.state.data.filter((el) => !el.done).length

    return (
      <div className="todoapp">
        <Header onItemAdded={this.addItem} />
        <ToDoList
          todos={this.state.filteredArr}
          onDeleted={this.deleteItem}
          onItemDone={this.itemDone}
          onItemEdit={this.itemEdit}
          clearCompleted={this.clearCompleted}
          onItemAdded={this.addItem}
          onItemSubmit={this.onItemSubmit}
        />
        <Footer
          itemsLeft={itemsLeft}
          activeFilter={this.state.activeFilter}
          setActiveFilter={this.setActiveFilter}
          clearCompleted={this.clearCompleted}
          all={all}
          active={active}
          completed={completed}
        />
      </div>
    )
  }
}

root.render(<AppElements />)
