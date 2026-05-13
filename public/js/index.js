const ws = new WebSocket(`ws://${window.location.host}`)

ws.onopen = () => { console.log('Connection open!') }
ws.onmessage = recieveMessage
ws.onclose = () => { console.log('Connection closed!') }
ws.onerror = () => { console.log('Connection error!') }

//Fetching user data
let user 

(async function(){
    const res = await fetch('/api/users/me')
    user = await res.json()
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
    //Data structure { type: string, content: string, sender: { id: number, name: string, role: string } }
    const data = JSON.parse(message.data)

    if (data.type === 'send-message') {
        const lastMessage = chatMessages.firstElementChild
        const lastAuthorId = lastMessage?.dataset.id

        if (lastAuthorId && lastAuthorId == data.sender.id) {
            const p = document.createElement('p')
            p.classList.add('message-text')
            p.innerText = data.content

            lastMessage.appendChild(p)
            return
        }

        const msgDiv = document.createElement('div')
        msgDiv.classList.add('message')
        msgDiv.classList.toggle('sent', data.sender.id == user.id)
        msgDiv.dataset.id = data.sender.id

        const msgAuthor = document.createElement('b')
        msgAuthor.classList.add('author')
        msgAuthor.innerText = data.sender.name

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
