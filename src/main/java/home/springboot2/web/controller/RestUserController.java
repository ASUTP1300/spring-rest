package home.springboot2.web.controller;

import home.springboot2.web.model.User;
import home.springboot2.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@RequestMapping(value = "/user2", produces = MediaType.APPLICATION_JSON_VALUE)
public class RestUserController {

    private UserService userService;

    @Autowired
    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public  User user(final HttpServletRequest request, Principal principal, Model model) {
        String currentUser = principal.getName();
        User user = userService.getByFirstName(currentUser);
        String message = "Добро пожаловать";
        model.addAttribute("user", user);
        model.addAttribute("message", message);

        return user;
    }
}
