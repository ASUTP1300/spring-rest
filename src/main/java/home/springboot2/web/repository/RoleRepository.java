package home.springboot2.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import  home.springboot2.web.model.Role;

public interface RoleRepository extends JpaRepository <Role, Long> {

    Role findByRole(String roleName);
}
