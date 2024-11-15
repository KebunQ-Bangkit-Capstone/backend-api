
export class DatabaseError extends Error {
    constructor(message: string, public statusCode = 500) {
        super(message);
        this.name = 'DatabaseError';
        this.statusCode = statusCode;
    }
}
