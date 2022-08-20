package net.okur.faector.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    Long id;
    @Column(name = "username", length = 50, nullable = false, unique = true)
    String username;
    @Column(name = "display_name", length = 50, nullable = false)
    String displayName;
    @Column(name = "password", nullable = false)
    String password;

    @Override
    public String toString() {
        return "id = " + id + "username = " + username + "displayName = " + displayName;
    }
}
