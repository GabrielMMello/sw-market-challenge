class Database {
    constructor(filePath) {
        this.filePath = filePath
    }
    connect() {
        console.log('Database successfully connected!')
        return this
    }
}

module.exports = Database