package home.springboot2.web.service;

import home.springboot2.web.DTO.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import  home.springboot2.web.model.Role;
import  home.springboot2.web.repository.RoleRepository;

import java.util.Arrays;
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

    @Override
    public List<String> getNamesRole(List<Role> listRoles) {
        return listRoles.stream().map(t->t.getRole().substring(5)).collect(Collectors.toList());
    }

    @Override
    public Set<Role> getRoles(UserDto userDto) {
        return roleRepository.findAll()
                .stream()
                .filter(r-> (Arrays.asList(userDto.getRoles())
                        .contains(r.getRole().substring(5)))).collect(Collectors.toSet());
    }
}
