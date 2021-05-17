package home.springboot2.web.controller;


import home.springboot2.web.DTO.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import home.springboot2.web.model.Role;
import home.springboot2.web.model.User;
import home.springboot2.web.repository.RoleRepository;
import home.springboot2.web.service.RoleServiceImp;
import home.springboot2.web.service.UserService;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.print.attribute.standard.Media;
import java.awt.*;
import java.net.URI;
import java.net.URL;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/admin2", produces = MediaType.APPLICATION_JSON_VALUE)
public class RestAdminController {

    private UserService userService;

    private RoleServiceImp roleService;

    private RoleRepository roleRepository;

    @Autowired
    public void setRoleService(RoleServiceImp roleService) {
        this.roleService = roleService;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public RestAdminController(UserService userService) {
        this.userService = userService;
    }

    /**
     *
     *
     * @param model
     * @param principal
     * @return
     */
    @GetMapping()
    public List<User> allUsers(Model model, Principal principal) {
        User user = new User();
        User userActive = userService.getByFirstName(principal.getName());
        List<Role> listRoles = roleRepository.findAll();

        model.addAttribute("user", user);
        model.addAttribute("userActive", userActive);
        model.addAttribute("users", userService.listUsers());
        model.addAttribute("listRoles", listRoles);
        return userService.listUsers();
    }

    @GetMapping(value = "/roles")
    public List<Role> allRoles() {
        return roleRepository.findAll();
    }


    @GetMapping("/{id}")
    public User show(@PathVariable("id") long id, Model model) {
        return userService.getById(id);
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public  User createWithLocation(@RequestBody UserDto userDto){
        ModelMapper modelMapper = new ModelMapper();

        User user = modelMapper.map(userDto, User.class);
        user.setRoles(roleService.getRoles(userDto));
        userService.save(user);
        return user;
    }

    @PutMapping (value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public void editWithLocation(@RequestBody UserDto userDto){
        ModelMapper modelMapper = new ModelMapper();

        User user = modelMapper.map(userDto, User.class);
        user.setRoles(roleService.getRoles(userDto));
        userService.update(user);
    }

    @DeleteMapping (value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteWithLocation(@RequestBody UserDto userDto){
        userService.remove(userDto.getId());

    }

    @GetMapping("/getOne")
    @ResponseBody
    public User getOne(long id) {
        return userService.getById(id);
    }

}
