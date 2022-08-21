package net.okur.faector;

import net.okur.faector.user.UserRequest;
import net.okur.faector.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class FaectorApplication {

    public static void main(String[] args) {
        SpringApplication.run(FaectorApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return args -> {
            UserRequest newUser = new UserRequest();
            newUser.setUsername("user1");
            newUser.setPassword("passW123");
            newUser.setDisplayName("User");
            userService.save(newUser);
        };
    }
}
