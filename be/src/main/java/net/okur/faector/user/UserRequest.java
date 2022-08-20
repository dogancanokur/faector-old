package net.okur.faector.user;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
public class UserRequest {
    Long id;
    @NotNull
    @Size(min = 3)
    String username;
    @NotNull
    @Size(min = 3)
    String displayName;
    @NotNull
    @Size(min = 3)
    String password;
}
