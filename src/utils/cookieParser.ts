export function cookieParser(cookie?: string) {
    if (!cookie) { return new Map() }

    const cookieArray = cookie.split(';').map(c => {
        return c.trim().split('=') as [string, string]
    })

    return new Map(cookieArray)
}