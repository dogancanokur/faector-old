package net.okur.faector.user;

import net.okur.faector.shared.GenericResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public GenericResponse createUser(@Validated @RequestBody UserRequest userRequest) {
        userService.save(userRequest);
        log.info("user created");
        return new GenericResponse(userRequest.getUsername() + " created");
    }
}
