package com.farmdirect.farmdirect_backend.crop;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crop")
@CrossOrigin(origins = "*")
public class CropRecommendationController {

    @GetMapping("/recommend")
    public CropResponse recommend(
            @RequestParam String soil,
            @RequestParam int rain
    ) {
        if (soil.equalsIgnoreCase("black") && rain > 800) {
            return new CropResponse("Cotton", "Good for black soil with high rainfall.");
        }

        return new CropResponse("Wheat", "Suitable for most soil types.");
    }
}
