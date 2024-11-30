export default class HttpException extends Error {
    public readonly code: number;

    constructor({ message, code }: { message: string; code: number }) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}
