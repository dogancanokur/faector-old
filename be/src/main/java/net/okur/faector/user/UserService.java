package net.okur.faector.user;

import java.util.List;

public interface UserService {

    User save(UserRequest userRequest);

    List<User> findAllUsers();
}
