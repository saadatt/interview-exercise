import {debounce} from 'lodash';
import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';

import './App.css';

function App() {
  const [ todos, setTodos ] = useState([]);
  const [ searchInput, setSearchInput ] = useState('');
  const [ searchEffect, setSearchEffect ] = useState('');

  const setSearchDebounced = useRef(debounce(setSearchEffect, 300));

  useEffect( () => {
    const fetchResult = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(res.data.filter(todo => todo.title.includes(searchEffect)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [searchEffect]);

  const onChange = useCallback(e => {
    const val = e.target.value;
    setSearchDebounced.current(val);
    setSearchInput(val);
  }, []);

  return (
      <div className="App">
        <input value={searchInput} onChange={onChange}/>
        {todos.map(todo => <p> {todo.title} </p>)}

      </div>
  );
}

export default App;
