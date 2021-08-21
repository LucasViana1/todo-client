import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';


const Websocket = () => {
  const socket = io('http://localhost:3333')
  socket.on('connect', () => console.log('Connection successfully'))
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const handleChangeInput = ({ target }) => {
    setTask(target.value);
  }

  const handleAddList = (e) => {
    e.preventDefault();

    if (task !== '') {
      socket.emit('to-do-list', {
        id: uuid(),
        value: task
      })
      setTask('');
    }
  }

  useEffect(() => {
    socket.on('previous-list', (data) =>{
      setList(data)
    })
  }, [])

  useEffect(() => {
    const updateList = data => setList(data);
    socket.on('to-do-list', updateList)
    return () => socket.off('to-do-list', updateList)
  }, [])

  return (
   <section>
    <h1>To-do list Websocket</h1>

    <form onSubmit={handleAddList}>
      <input onChange={handleChangeInput} value={task} placeholder="digite uma tarefa" />
      <button type="submit">Adicionar</button>
    </form>
    
    <ul>
      {list.map(({id, value}) => (
        <li key={id}>{value}</li>
      ))}
    </ul>

   </section>
  );
}

export default Websocket;
