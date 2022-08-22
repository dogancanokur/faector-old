package net.okur.faector.user;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.okur.faector.shared.Views;

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
    @JsonView(Views.Base.class)
    String username;
    @Column(name = "display_name", length = 50, nullable = false)
    @JsonView(Views.Base.class)
    String displayName;
    @Column(name = "password", nullable = false)
//    @JsonIgnore
    String password;

    @Column(name = "image")
    @JsonView(Views.Base.class)
    String image;

    @Override
    public String toString() {
        return "id = " + id + "username = " + username + "displayName = " + displayName;
    }
}
