package net.okur.faector.user;

import lombok.Data;

@Data
public class UserRequest {
    Long id;
    String username;
    String displayName;
    String password;
}
