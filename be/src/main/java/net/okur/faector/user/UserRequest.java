package net.okur.faector.user;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
public class UserRequest {
    Long id;
    @NotNull
    @Size(min = 4, max = 50)
    String username;
    @NotNull
    @Size(min = 4, max = 50)
    String displayName;
    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "Password must be contains at least one uppercase, one lowercase and one numeric.")
    @Size(min = 4, max = 50)
    String password;
}
