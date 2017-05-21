class MemoryStore {
    constructor() {
        this.memories = []
    }

    get() {
        // return the 10 latest memories
        return this.memories
    }

    add(memory) {
        // store a new memory
        this.memories.push(memory)
    }
}

module.exports = MemoryStore
