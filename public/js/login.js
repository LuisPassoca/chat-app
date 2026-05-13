const form = document.querySelector('.login-form')
const err = document.querySelector('.error-message')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        //Display one error message at a time
        if (data.errors) { err.textContent = Object.values(data.errors)[0][0] }
        else { err.textContent = data.message }
        return
    }

    window.location.href = '/'
})