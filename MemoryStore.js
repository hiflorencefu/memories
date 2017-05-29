class MemoryStore {
    constructor() {
        this.memories = []
    }

    set(memories) {
        this.memories = memories
    }

    latest() {
        // return the 10 latest memories
        return this.memories
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
