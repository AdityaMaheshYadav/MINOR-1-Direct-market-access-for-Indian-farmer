package com.farmdirect.farmdirect_backend.farmerauth;

public class FarmerLoginRequest {

    private String email;
    private String password;

    public FarmerLoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
