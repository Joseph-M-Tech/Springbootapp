// AuthController.java
package com.example.auth.controller;

import com.example.auth.dto.LoginRequest;
import com.example.auth.dto.SignupRequest;
import com.example.auth.entity.User;
import com.example.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }
    
    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("loginRequest", new LoginRequest());
        return "login";
    }
    
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute LoginRequest loginRequest, 
                      BindingResult result, 
                      RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "login";
        }
        
        // Authentication logic will be handled by Spring Security
        userService.updateLastLogin(loginRequest.getUsernameOrEmail());
        return "redirect:/dashboard";
    }
    
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("signupRequest", new SignupRequest());
        return "signup";
    }
    
    @PostMapping("/signup")
    public String signup(@Valid @ModelAttribute SignupRequest signupRequest, 
                        BindingResult result, 
                        Model model,
                        RedirectAttributes redirectAttributes) {
        
        if (result.hasErrors()) {
            return "signup";
        }
        
        // Check if passwords match
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            model.addAttribute("passwordError", "Passwords do not match");
            return "signup";
        }
        
        // Check if username exists
        if (userService.usernameExists(signupRequest.getUsername())) {
            model.addAttribute("usernameError", "Username already taken");
            return "signup";
        }
        
        // Check if email exists
        if (userService.emailExists(signupRequest.getEmail())) {
            model.addAttribute("emailError", "Email already registered");
            return "signup";
        }
        
        // Create new user
        User user = new User(signupRequest.getUsername(), 
                           signupRequest.getEmail(), 
                           signupRequest.getPassword());
        
        userService.registerUser(user);
        
        redirectAttributes.addFlashAttribute("successMessage", 
            "Registration successful! Please login.");
        return "redirect:/login";
    }
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
}