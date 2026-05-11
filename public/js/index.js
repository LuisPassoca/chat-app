const ws = new WebSocket(`ws://${window.location.host}`)

ws.onopen = () => { console.log('Connection open!') }
ws.onmessage = recieveMessage
ws.onclose = () => { console.log('Connection closed!') }
ws.onerror = () => { console.log('Connection error!') }

//Temporary user UUID
const sender = crypto.randomUUID()

//Handling messages
const chatMessages = document.querySelector('.chat-messages')

//Sending message
function sendMessage(content) {
    const message = {
        type: 'send-message',
        sender,
        content
    }

    ws.send(JSON.stringify(message))
}

//Recieving message
function recieveMessage(message) {
    //Data structure { type: string, content: string, sender: string }
    const data = JSON.parse(message.data)

    if (data.type === 'send-message') {
        const lastMessage = chatMessages.firstElementChild
        const lastAuthor = lastMessage?.querySelector('.author')?.innerText

        if (lastAuthor === data.sender) {
            const p = document.createElement('p')
            p.classList.add('message-text')
            p.innerText = data.content

            lastMessage.appendChild(p)
            return
        }

        const msgDiv = document.createElement('div')
        msgDiv.classList.add('message')
        msgDiv.classList.toggle('sent', data.sender === sender)

        const msgAuthor = document.createElement('b')
        msgAuthor.classList.add('author')
        msgAuthor.innerText = data.sender

        const msgText = document.createElement('p')
        msgText.classList.add('message-text')
        msgText.innerText = data.content

        msgDiv.appendChild(msgAuthor)
        msgDiv.appendChild(msgText)

        chatMessages.prepend(msgDiv)
    }
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

sendButton.addEventListener('click', () => {
    messageInput.focus()
})
