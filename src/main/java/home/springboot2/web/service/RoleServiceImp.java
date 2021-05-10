package home.springboot2.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import  home.springboot2.web.model.Role;
import  home.springboot2.web.repository.RoleRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImp implements RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> getRoleByName(List<String> listStringRoles){
        return   listStringRoles.stream()
                .map(s -> roleRepository.findByRole(s))
                .collect(Collectors.toSet());
    }
}
