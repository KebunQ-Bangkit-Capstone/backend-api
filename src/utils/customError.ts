
export class DatabaseError extends Error {
    constructor(message: string, public code = 500) {
        super(message);
        this.name = 'DatabaseError';
        this.code = code;
    }
}
