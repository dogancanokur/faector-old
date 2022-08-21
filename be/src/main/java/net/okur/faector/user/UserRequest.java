package net.okur.faector.user;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
public class UserRequest {
    Long id;
    @NotNull(message = "{faector.constraints.username.NotNull.message}")
    @Size(min = 4, max = 50)
    @UniqueUsername
    String username;
    @NotNull(message = "{faector.constraints.displayName.NotNull.message}")
    @Size(min = 4, max = 50)
    String displayName;
    @NotNull(message = "{faector.constraints.password.NotNull.message}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{faector.constraints.password-mismatch.message}")
    @Size(min = 4, max = 50)
    String password;
}
