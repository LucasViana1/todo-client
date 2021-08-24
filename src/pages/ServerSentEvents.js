import { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid/dist/v4';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

const EventSource = EventSourcePolyfill || NativeEventSource ;
const apiUrl = 'http://localhost:4444';

const ServerSentEvents = () => {
  const [eventSource, setEventSource] = useState();
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  
  const updateMessages = useCallback((msg) => {
    if (msg !== JSON.stringify(list)) {
      setList(JSON.parse(msg))
    }
  }, [list]);
  
  useEffect(() => {
    if (!eventSource) {
      const sse = new EventSource(`${apiUrl}/list`, {
        headers: {
          'Authentication': 'Bearer 1203912-3920ks03k2-39k1k3-'
        }
      });
      setEventSource(sse);
    }
    return () => eventSource && eventSource.close()
  }, [eventSource])

   useEffect(() => {
    if (eventSource) {
      eventSource.onmessage = (event) => {
        updateMessages(event.data)
      }

      eventSource.onerror = () => {
        updateMessages('server closed connection')
        eventSource.close()
      }
    }
  }, [eventSource, updateMessages]);

  const handleChangeInput = useCallback(({ target }) => setTask(target.value), [])

  const handleAddTask = useCallback(async (e) => {
    e.preventDefault();

    if (task !== '') {
      setTask('')
      await fetch(`${apiUrl}/list`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: uuid(), value: task })
      })
    }
  }, [task]);

  return (
    <section>
      <h1>To-do list ServerSentEvents</h1>

      <form onSubmit={handleAddTask}>
        <input onChange={handleChangeInput} value={task} placeholder="digite uma tarefa" />
        <button type="submit">Adicionar</button>
      </form>
    
      <ul>
        {list.map(({id, value}) => (
          <li key={id}>{value}</li>
        ))}
      </ul>

    </section>
  )
}

export default ServerSentEvents