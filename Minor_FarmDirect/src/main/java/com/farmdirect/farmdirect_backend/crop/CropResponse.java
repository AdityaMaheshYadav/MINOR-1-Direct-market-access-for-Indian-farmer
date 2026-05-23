package com.farmdirect.farmdirect_backend.crop;

public class CropResponse {
    public String crop;
    public String reason;

    public CropResponse(String crop, String reason) {
        this.crop = crop;
        this.reason = reason;
    }
}
