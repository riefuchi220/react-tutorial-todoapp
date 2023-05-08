import { useState, useRef } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]); 

  const todoNameRef = useRef(); //要素の取得

  const handleAddTodo = () => {
    //タスクの追加
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) =>{
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
    })
    // ...prevTodos　スプレット構文、今あるprevTodosに新しいデータ{id: 1, name: name, completed: false}追加する
    // オブジェクトにおけるタスクの追加の書き方
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]; //todo一覧をコピーしている。理由:　状態変数で管理されているものを直接触るのはよくない。
    const todo = newTodos.find((todo) => todo.id === id); //idは引数(id)のid
    todo.completed = !todo.completed; // チェクボックスの状態変化の対応
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
