package home.springboot2.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import home.springboot2.web.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByFirstName(String firstname);

    User findUserById(Long id);
}
