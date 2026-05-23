package com.farmdirect.farmdirect_backend.fertilizer;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fertilizer")
@CrossOrigin(origins = "*")
public class FertilizerController {

    @GetMapping
    public FertilizerResponse getFertilizer() {
        return new FertilizerResponse("Urea", "Promotes leaf growth");
    }
}
