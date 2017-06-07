var corrupt = require('./corrupt')

class MemoryStore {
    constructor() {
        this.memories = []
    }

    set(memories) {
        this.memories = memories
    }

    latest() {
        // return the 10 latest memories
        var slice = this.memories.slice(this.memories.length-10)

        for (var m of slice) {
            m.memory.title = corrupt(m.memory.title)
            m.memory.feeling = corrupt(m.memory.feeling)
            m.memory.time = corrupt(m.memory.time)
            m.memory.place = corrupt(m.memory.place)
            m.memory.event = corrupt(m.memory.event)
            m.memory.company = corrupt(m.memory.company)
            m.memory.sense.sight = corrupt(m.memory.sense.sight)
            m.memory.sense.sound = corrupt(m.memory.sense.sound)
            m.memory.sense.smell = corrupt(m.memory.sense.smell)
            m.memory.sense.touch = corrupt(m.memory.sense.touch)
            m.memory.sense.taste = corrupt(m.memory.sense.taste)
        }

        return slice.reverse()
    }

    get() {
        return this.memories
    }

    add(memory) {
        // store a new memory
        this.memories.push(memory)
    }
}

module.exports = MemoryStore
