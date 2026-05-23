package com.farmdirect.farmdirect_backend.product;

public class ApiResponse {
    public boolean success;
    public String message;

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
