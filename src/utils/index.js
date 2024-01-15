export const getHoursList = () => {
    const hours = []
    for (let i = 0; i < 13; i++) {
        const str = i < 10 ? `0${i}` : `${i}`
        hours.push(str)
    }
    return hours
}


export const getMinutesList = () => {
    const minutes = []
    for (let i = 0; i < 60; i++) {
        const str = i < 10 ? `0${i}` : `${i}`
        minutes.push(str)
    }
    return minutes
}
