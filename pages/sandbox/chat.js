import MyLayout from "../../components/layout";
import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
const socket = io(process.env.API_HOST);

function Chat() {
    const [form, setState] = useState({
        username: '',
        message: '',
    })

    useEffect(() => {
        socket.connect()
        return () => socket.disconnect();
      }, [])    

    const updateField = e => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });        
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('sendMessage', form.message )
        console.log(form.message)
        setState({...form, message: ''})
        return false
    }

    return (
        <MyLayout>
            <div>
                <p>This is the Chat page.</p>
                <ul id="messages"></ul>
                <form onSubmit={handleSubmit}>
                    <input name="message" autoComplete="off" onChange={updateField} value={form.message}/>
                    <button>Send</button>
                </form>                
            </div>
        </MyLayout>
    );
}

export default Chat
