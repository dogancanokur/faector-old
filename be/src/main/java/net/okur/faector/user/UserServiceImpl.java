package net.okur.faector.user;

import antlr.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public User save(UserRequest userRequest) {

        User user = new User();
        user.setId(userRequest.getId());
        user.setUsername(userRequest.getUsername());
        user.setDisplayName(userRequest.getDisplayName());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        return userRepository.save(user);
    }
}
