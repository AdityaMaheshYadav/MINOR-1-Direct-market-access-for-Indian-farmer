package com.farmdirect.farmdirect_backend.product;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final List<Product> products = new ArrayList<>();
    private long productIdCounter = 1L; // 👈 Unique ID generator

    public ProductController() {

        // --- REAL FARM PRODUCTS ------------------------------------------
        addInitial("Wheat", "Fresh wheat from local farms.", 45, "1 kg",
                "https://images.unsplash.com/photo-1598514982627-4c19b201e179");

        addInitial("Rice", "Premium long-grain basmati rice.", 60, "1 kg",
                "https://images.unsplash.com/photo-1603899122478-9b87c0f205b3");

        addInitial("Corn", "Organic sweet corn harvested today.", 30, "1 kg",
                "https://images.unsplash.com/photo-1506801310323-534be5e7f325");

        addInitial("Millets", "Nutrient-rich organic millets.", 55, "1 kg",
                "https://images.unsplash.com/photo-1587733059516-2b2fd01bbd47");

        addInitial("Toor Dal", "Protein-rich toor dal for daily meals.", 110, "1 kg",
                "https://images.unsplash.com/photo-1592928302780-8d087a7f4206");

        addInitial("Moong Dal", "High-quality moong dal.", 95, "1 kg",
                "https://images.unsplash.com/photo-1584288593202-ec98fef54c69");

        addInitial("Chana Dal", "Clean and fresh chana dal.", 85, "1 kg",
                "https://images.unsplash.com/photo-1587732352931-cd4b00f22df1");

        addInitial("Tomatoes", "Juicy and fresh tomatoes.", 20, "1 kg",
                "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce");

        addInitial("Potatoes", "Fresh potatoes suitable for all dishes.", 25, "1 kg",
                "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2");

        addInitial("Onions", "Red onions freshly harvested.", 30, "1 kg",
                "https://images.unsplash.com/photo-1601004890707-44aa0986e8c0");

        addInitial("Mixed Vegetables", "Daily vegetable mix directly from farms.", 50, "1 kg",
                "https://images.unsplash.com/photo-1542838132-92c53300491e");

        addInitial("Bananas", "Naturally ripened bananas.", 40, "1 dozen",
                "https://images.unsplash.com/photo-1574226516831-e1dff420e43e");

        addInitial("Apples", "Fresh Kashmiri apples.", 120, "1 kg",
                "https://images.unsplash.com/photo-1567302546419-3f0c777b0a45");

        addInitial("Oranges", "Sweet and juicy oranges.", 80, "1 kg",
                "https://images.unsplash.com/photo-1587733891694-2e88d8e75451");

        addInitial("Milk", "Pure cow milk, farm fresh.", 55, "1 liter",
                "https://images.unsplash.com/photo-1580910051074-7afc5a50b8d3");

        addInitial("Curd", "Natural thick homemade curd.", 45, "500 g",
                "https://images.unsplash.com/photo-1580910040628-53b74bde41e9");

        addInitial("Sugarcane", "Fresh sugarcane for juice.", 15, "1 stick",
                "https://images.unsplash.com/photo-1600611146765-8156045dcca5");

        addInitial("Cotton", "Raw cotton grown by Indian farmers.", 200, "1 kg",
                "https://images.unsplash.com/photo-1607083200813-5816240e0eaa");

        addInitial("Spices Mix", "Pure spice mix with no chemicals.", 150, "250 g",
                "https://images.unsplash.com/photo-1615486640180-bd5cb07f461e");

        addInitial("Ginger", "Fresh aromatic ginger.", 90, "500 g",
                "https://images.unsplash.com/photo-1601004890443-2d1e74d2c277");

        addInitial("Garlic", "Organic garlic bulbs.", 120, "500 g",
                "https://images.unsplash.com/photo-1488459716781-31db52582fe9");

        addInitial("Carrots", "Crunchy organic carrots.", 35, "1 kg",
                "https://images.unsplash.com/photo-1542834369-f10ebf06d3ef");

        addInitial("Green Chillies", "Spicy and fresh chillies.", 25, "250 g",
                "https://images.unsplash.com/photo-1589927986089-35812388d1f5");

        addInitial("Cabbage", "Fresh cabbage from fields.", 20, "1 pc",
                "https://images.unsplash.com/photo-1547514701-eef0c3ce1df4");

        addInitial("Spinach", "Green and healthy spinach leaves.", 15, "1 bunch",
                "https://images.unsplash.com/photo-1524593166152-9f1a9a3a65fd");

        addInitial("Cauliflower", "Organic cauliflower.", 35, "1 pc",
                "https://images.unsplash.com/photo-1601004890207-7c30f63f495e");

        addInitial("Mangoes", "Seasonal Alphonso mangoes.", 180, "1 kg",
                "https://images.unsplash.com/photo-1567306225849-cb4f1a2453c5");

        addInitial("Pomegranates", "Fresh juicy pomegranates.", 150, "1 kg",
                "https://images.unsplash.com/photo-1603031083284-106e807ba7dd");
    }

    // -------------------------------------------------------------------------
    // Helper method to add preloaded products with UNIQUE ID
    // -------------------------------------------------------------------------
    private void addInitial(String name, String desc, int price, String unit, String image) {
        products.add(new Product(productIdCounter++, 1L, name, desc, price, unit, image));
    }


    // -------------------------------------------------------------------------
    // GET ALL PRODUCTS
    // -------------------------------------------------------------------------
    @GetMapping("/all")
    public List<Product> getAll() {
        return products;
    }

    // -------------------------------------------------------------------------
    // ADD NEW PRODUCT
    // -------------------------------------------------------------------------
    @PostMapping("/add")
    public Map<String, Object> add(@RequestBody Product p) {
        p.id = productIdCounter++; // assign unique id
        products.add(p);

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "Product added successfully");
        return res;
    }

    // -------------------------------------------------------------------------
    // GET PRODUCTS OF A SPECIFIC FARMER
    // -------------------------------------------------------------------------
    @GetMapping("/farmer/{farmerId}")
    public List<Product> getFarmerProducts(@PathVariable Long farmerId) {
        List<Product> out = new ArrayList<>();
        for (Product p : products) {
            if (Objects.equals(p.farmerId, farmerId))
                out.add(p);
        }
        return out;
    }
}
