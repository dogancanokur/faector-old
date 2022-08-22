package net.okur.faector.auth;

import com.fasterxml.jackson.annotation.JsonView;
import net.okur.faector.shared.Views;
import net.okur.faector.user.User;
import net.okur.faector.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
@RequestMapping("/api/1.0")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/auth")
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization) {

        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64Encoded)); // user1:pass1
        String[] parts = decoded.split(":"); // ["user1", "pass1"]
        String username = parts[0]; // user1
        User userInDB = userRepository.findByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(userInDB);
    }
}
