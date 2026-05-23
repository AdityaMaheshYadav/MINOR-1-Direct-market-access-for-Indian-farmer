package com.farmdirect.farmdirect_backend.schemes;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "*")
public class GovernmentSchemeController {

    @GetMapping
    public List<Scheme> schemes() {
        List<Scheme> list = new ArrayList<>();

        list.add(new Scheme("PM-Kisan", "₹6000 yearly support for small farmers"));
        list.add(new Scheme("Soil Health Card", "Soil testing & crop guidance"));
        list.add(new Scheme("eNAM", "Online marketplace to sell produce"));

        return list;
    }
}
