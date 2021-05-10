package home.springboot2.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import home.springboot2.web.dao.UserDAO;
import home.springboot2.web.model.User;
import home.springboot2.web.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    private PasswordEncoder passwordEncoder;

    private UserDAO userDAO;

    @Autowired
    private UserRepository userRepository;

     @Autowired
     public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
         this.passwordEncoder = passwordEncoder;
     }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public UserServiceImp(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Transactional
    @Override
    public void add(User user) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
    }

    @Transactional
    @Override
    public void update(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userDAO.update(user);
    }

    @Transactional
    @Override
    public void remove(long id) {
        userDAO.remove(id);
    }

    @Override
    public User getById(long id) {
        return userDAO.getById(id);
    }

    @Override
    public User getByFirstName(String firstname) {
       return userDAO.getByFirstName(firstname);
    }

    @Transactional
    @Override
    public List<User> listUsers() {
        return userDAO.listUsers();
    }
}
