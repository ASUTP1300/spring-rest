package home.springboot2.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import home.springboot2.web.model.User;
import home.springboot2.web.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;


@Controller
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


        @GetMapping("/user")
        public String showResults() {
            return "user/getById";
        }
}
