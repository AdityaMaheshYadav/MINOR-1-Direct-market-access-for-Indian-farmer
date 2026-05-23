package com.farmdirect.farmdirect_backend.farmerauth;

public class FarmerLoginResponse {

    private boolean success;
    private String message;
    private Long farmerId;
    private String name;
    private String email;

    public FarmerLoginResponse() {
    }

    public FarmerLoginResponse(boolean success, String message, Long farmerId, String name, String email) {
        this.success = success;
        this.message = message;
        this.farmerId = farmerId;
        this.name = name;
        this.email = email;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
