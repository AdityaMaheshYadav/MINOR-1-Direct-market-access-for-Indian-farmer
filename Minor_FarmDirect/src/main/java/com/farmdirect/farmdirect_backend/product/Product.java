package com.farmdirect.farmdirect_backend.product;

public class Product {
    public Long id;
    public Long farmerId;
    public String name;
    public String description;
    public double price;
    public String quantity;
    public String image;

    public Product() {}

    public Product(Long id, Long farmerId, String name, String description,
                   double price, String quantity, String image) {
        this.id = id;               // 👈 Correct: unique product ID
        this.farmerId = farmerId;   // 👈 Farmer ID
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
}
