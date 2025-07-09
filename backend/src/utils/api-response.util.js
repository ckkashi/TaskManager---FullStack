class ApiResponse {
    constructor(status, message, data = null) {
        this.success = status < 400;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    toJSON() {
        return {
            success: this.success,
            status: this.status,
            message: this.message,
            data: this.data,
        };
    }
}

export default ApiResponse;
