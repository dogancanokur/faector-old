package net.okur.faector.auth;

import com.fasterxml.jackson.annotation.JsonView;
import net.okur.faector.error.ApiError;
import net.okur.faector.shared.Views;
import net.okur.faector.user.User;
import net.okur.faector.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    @PostMapping("/auth")
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null) {
            ApiError apiError = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64Encoded)); // user1:pass1
        String[] parts = decoded.split(":"); // ["user1", "pass1"]
        if (parts.length == 0) {
            ApiError apiError = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }
        String username = parts[0]; // user1
        String password = parts[1]; // pass1

        User userInDB = userRepository.findByUsername(username);
        if (userInDB == null) { // User not found
            ApiError apiError = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }
        String hashedPassword = userInDB.getPassword();
        if (!passwordEncoder.matches(password, hashedPassword)) { // Wrong Password
            ApiError apiError = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        // username , displayname, image
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("username", userInDB.getUsername());
        responseBody.put("displayName", userInDB.getDisplayName());
        responseBody.put("image", userInDB.getImage());
        return ResponseEntity.status(HttpStatus.OK).body(userInDB);

    }
}
