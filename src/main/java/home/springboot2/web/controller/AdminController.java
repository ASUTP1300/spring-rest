package home.springboot2.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import home.springboot2.web.model.Role;
import home.springboot2.web.model.User;
import home.springboot2.web.repository.RoleRepository;
import home.springboot2.web.service.RoleServiceImp;
import home.springboot2.web.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

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
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String example(Model model, Principal principal) {
        User user = new User();
        User userActive = userService.getByFirstName(principal.getName());
        List<Role> listRoles = roleRepository.findAll();
        model.addAttribute("userActive", userActive);
        return "admin/index2";
    }
}
