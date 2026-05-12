const form = document.querySelector('.login-form')
const err = document.querySelector('.error-message')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch(`${window.location.origin}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        err.textContent = 'Invalid email or password!'
        return
    }

    window.location.href = '/'
})