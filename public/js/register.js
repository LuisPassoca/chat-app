const form = document.querySelector('.register-form')
const err = document.querySelector('.error-message')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirm = formData.get('confirm')

    if (password !== confirm) {
        err.innerHTML = 'Passwords do not match!'
        return
    }

    const res = await fetch(`${window.location.origin}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        err.textContent = data.message
        return
    }

    await login(email, password)
})

async function login(email, password) {
    const res = await fetch(`${window.location.origin}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        window.alert('Unable to log you in, please do so manually.')
        window.location.href = '/login'
    }

    window.location.href = '/'
}