package home.springboot2.web.service;

import home.springboot2.web.model.User;

import java.util.List;

public interface UserService {

    void add(User user);

    void update(User user);

    void remove(long id);

    User getById( long id);

    User getByFirstName(String firstname);

    List<User> listUsers();
}
