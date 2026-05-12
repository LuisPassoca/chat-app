export function jsonParser(data: string) {
    try {
        return JSON.parse(data)
    } catch (err) {
        return null
    }
}