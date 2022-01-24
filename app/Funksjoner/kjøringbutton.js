

let starting = false
let counter = 0
const handleStateChange = (params) => {
    starting = params
}
const updateCounter = (i) => {
    counter = i
}

export { handleStateChange, starting, counter, updateCounter}
