class MemoryStore {
    constructor() {
        this.memories = []
    }

    set(memories) {
        this.memories = memories
    }

    latest() {
        // return the 10 latest memories
        return this.memories.slice(0, 10)
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
