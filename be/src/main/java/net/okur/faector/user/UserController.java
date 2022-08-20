package net.okur.faector.user;

import net.okur.faector.error.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/1.0/users")
public class UserController {
    public static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-user")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest) {

        Map<String, String> validationErrors = new HashMap<>();

        if (!StringUtils.hasText(userRequest.getUsername())) {
            validationErrors.put("username", "Username cannot be null.");
        }
        if (!StringUtils.hasText(userRequest.getDisplayName())) {
            validationErrors.put("displayName", "Display Name cannot be null.");
        }
        if (!StringUtils.hasText(userRequest.getPassword())) {
            validationErrors.put("password", "Password cannot be null.");
        }
        if (validationErrors.size() > 0) {
            ApiError apiError = new ApiError(400, "Validation Error",
                    "/api/1.0/users/create-user", validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
        }

        userService.save(userRequest);
        log.info("user created");
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
