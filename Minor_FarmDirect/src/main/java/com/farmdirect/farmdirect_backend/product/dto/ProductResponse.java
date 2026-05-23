package com.farmdirect.farmdirect_backend.product.dto;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String quantity;
    private String image;
    private String language;

    public ProductResponse(Long id, String name, String description,
                           Double price, String quantity, String image, String language) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
        this.language = language;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getQuantity() { return quantity; }
    public String getImage() { return image; }
    public String getLanguage() { return language; }
}
