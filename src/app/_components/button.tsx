/* eslint-disable react/button-has-type */

'use client'

import { useEffect, useState } from 'react'
import { socket } from '../socket'

export default function Button() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [content, setContent] = useState()
  const [responses, setResponses] = useState<string[]>([])

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    function onResponse(data : string) {
      setResponses((prevResponses) => [...prevResponses, data])
      console.log('data', data)
      console.table(responses)
    }

    socket.on('connect', onConnect)
    socket.on('messageResponse', onResponse)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('messageResponse', onResponse)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div>
      <p>
        Status:
        {isConnected ? 'connected' : 'disconnected'}
      </p>
      <p>
        Transport:
        {transport}
      </p>
      <div className="flex justify-around" >
        <button
          className="h-60 w-60 bg-neutral-500 text-6xl text-black font-bold"
          onClick={(e) => {
            e.stopPropagation()
            socket.emit('message', 'play')
          }}
        >
          Play
        </button>

        <button
          className="h-60 w-60 bg-neutral-500 text-6xl text-black font-bold"

          onClick={(e) => {
            e.stopPropagation()
            socket.emit('message', 'pause')
          }}
        >
          pause
        </button>
      </div>
      <div className="flex justify-around" >
        <button
          className="h-60 w-60 bg-neutral-500 text-6xl text-black font-bold"
          onClick={(e) => {
            e.stopPropagation()
            socket.emit('select', 'video1')
          }}
        >
          Video 1
        </button>

        <button
          className="h-60 w-60 bg-neutral-500 text-6xl text-black font-bold"

          onClick={(e) => {
            e.stopPropagation()
            socket.emit('select', 'video2')
          }}
        >
          Video 2
        </button>
      </div>
      <p>
        Response received
        {
          responses.map((response, index) => (
            <span key={index}>
              {response}
            </span>
          ))
        }
      </p>

    </div>
  )
}
