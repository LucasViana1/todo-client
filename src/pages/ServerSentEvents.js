const apiUrl = 'http://localhost:4444';

const ServerSentEvents = () => {
  const eventSource = new EventSource(`${apiUrl}/list`);

  const updateMessages = (msg) => {
    console.log('msg')
    console.log(msg)
  }

  eventSource.onmessage = (event) => {
    console.log('up')
    updateMessages(event.data)
  }

  eventSource.onerror = () => {
    updateMessages('server closed connection')
    eventSource.close()
  }

  const handleAddTask = () => {
    fetch(`${apiUrl}/list`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ task: '=' })
    })
  }

  return (
    <section>
      <h1>To-do list ServerSentEvents</h1>
      <button onClick={handleAddTask}>Ativar</button>
    </section>
  )
}

export default ServerSentEvents