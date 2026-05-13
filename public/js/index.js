const protocol = location.protocol == 'https:' ? 'wss:' : 'ws:'
const ws = new WebSocket(`${protocol}//${window.location.host}`)

ws.onopen = () => { console.log('Connection open!') }
ws.onmessage = recieveMessage
ws.onclose = () => { console.log('Connection closed!') }
ws.onerror = () => { console.log('Connection error!') }

//Initial fetch for user data and database messages
let user 

(async function(){
    const fetchUser = async () => {
        const res = await fetch('/api/users/me')
        if (!res.ok) { window.location.href = '/login' }

        return await res.json()
    }

    const fetchMessages = async () => {
        const res = await fetch('/api/messages')

        if (!res.ok) { window.alert('Unable to retrieve older messages!')}

        const json = await res.json()
        return json.data
    }
    
    user = await fetchUser()
    const messages = await fetchMessages()
    for (const m of messages) { insertMessage(m) }
})()

//Handling messages
const chatMessages = document.querySelector('.chat-messages')

//Sending message
function sendMessage(content) {
    const message = {
        type: 'send-message',
        content
    }

    ws.send(JSON.stringify(message))
}

//Recieving message
function recieveMessage(message) {
    //Data structure { type: string, content: string, sentAt: string, sender: { id: number, name: string, role: string } }
    const data = JSON.parse(message.data)

    if (data.type === 'send-message') { insertMessage(data) }
    if (data.type === 'error') { window.alert(data.content) }
}

//Handle sending message
const messageForm = document.querySelector('.message-form')
const messageInput = document.querySelector('.message-input')
const sendButton = document.querySelector('.send-button')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const content = messageInput.value.trim()
    if (!content) { return }

    sendMessage(content)
    messageForm.reset()
})

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
        e.preventDefault()
        messageForm.requestSubmit() 
    }
})

sendButton.addEventListener('click', (e) => {
    messageInput.focus()
})

//Insert message function
function insertMessage(message) {
    const lastMessage = chatMessages.firstElementChild
    const lastAuthorId = lastMessage?.dataset.authorId

    if (lastAuthorId && lastAuthorId == message.sender.id) {
        const p = document.createElement('p')
        p.dataset.messageId = message.id
        p.classList.add('message-text')
        p.innerText = message.content

        lastMessage.appendChild(p)
        return
    }

    const msgDiv = document.createElement('div')
    msgDiv.classList.add('message')
    msgDiv.classList.toggle('sent', message.sender.id == user.id)
    msgDiv.dataset.authorId = message.sender.id

    const msgAuthor = document.createElement('b')
    msgAuthor.classList.add('author')
    msgAuthor.innerText = message.sender.name

    const msgText = document.createElement('p')
    msgText.classList.add('message-text')
    msgText.innerText = message.content

    msgDiv.appendChild(msgAuthor)
    msgDiv.appendChild(msgText)

    chatMessages.prepend(msgDiv)
}