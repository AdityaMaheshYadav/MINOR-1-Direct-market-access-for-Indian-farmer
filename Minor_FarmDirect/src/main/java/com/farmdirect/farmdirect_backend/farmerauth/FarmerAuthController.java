package com.farmdirect.farmdirect_backend.farmerauth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/farmer/auth")
@CrossOrigin(origins = "*")
public class FarmerAuthController {

    private final FarmerRepository farmerRepository;

    @Autowired
    public FarmerAuthController(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerFarmer(@RequestBody FarmerRegisterRequest request) {

        // Check if email already exists
        if (farmerRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Farmer with this email already exists.");
        }

        Farmer farmer = new Farmer(
                request.getName(),
                request.getEmail(),
                request.getPassword(), // ⚠ plain text
                request.getPhone(),
                request.getAddress()
        );

        Farmer saved = farmerRepository.save(farmer);

        return ResponseEntity.ok("Farmer registered successfully with id: " + saved.getId());
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<FarmerLoginResponse> loginFarmer(@RequestBody FarmerLoginRequest request) {

        Optional<Farmer> optionalFarmer = farmerRepository.findByEmail(request.getEmail());

        if (optionalFarmer.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body(new FarmerLoginResponse(false, "Invalid email or password", null, null, null));
        }

        Farmer farmer = optionalFarmer.get();

        // Compare plain text password
        if (!farmer.getPassword().equals(request.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body(new FarmerLoginResponse(false, "Invalid email or password", null, null, null));
        }

        FarmerLoginResponse response = new FarmerLoginResponse(
                true,
                "Login successful",
                farmer.getId(),
                farmer.getName(),
                farmer.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}
