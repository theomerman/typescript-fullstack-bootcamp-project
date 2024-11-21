export class CustomException extends Error {
    constructor(
        message: string,
        public status: number,
    ) {
        super(message)
    }
}