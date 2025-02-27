class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.sttusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}