package home.springboot2.web.DTO;

import home.springboot2.web.model.Role;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

public class UserDto {

    private Long id;

    private String firstName;

    private String password;

    private String lastName;

    private String email;

    private String[] roles;

    public UserDto(Long id, String firstName, String password, String lastName, String email, String[] roles) {
        this.id = id;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
        this.email = email;
        this.roles = roles;
    }



    public String getFirstName() {
        return firstName;
    }

    public String getPassword() {
        return password;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }



}
