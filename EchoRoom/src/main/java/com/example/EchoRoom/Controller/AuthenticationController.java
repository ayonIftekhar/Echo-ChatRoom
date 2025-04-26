package com.example.EchoRoom.Controller;

import com.example.EchoRoom.DTOs.Authentication.LoginRequest;
import com.example.EchoRoom.DTOs.Authentication.LoginResponse;
import com.example.EchoRoom.DTOs.ForgotPassword.ForgotPasswordRequest;
import com.example.EchoRoom.DTOs.Register.RegisterRequest;
import com.example.EchoRoom.DTOs.ResetPassword.ResetPasswordRequest;
import com.example.EchoRoom.DatabaseEntity.PasswordResetEntity;
import com.example.EchoRoom.DatabaseEntity.UserEntity;
import com.example.EchoRoom.MySqlRepositories.PassResetRepository;
import com.example.EchoRoom.MySqlRepositories.UserRepository;
import com.example.EchoRoom.SecurityConfiguration.JwtUtility;
import com.example.EchoRoom.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtility jwtUtility;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PassResetRepository passResetRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${frontend.origin}")
    private String FRONT_END;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest , HttpServletResponse response){

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword())
            );
            UserEntity userDetails = userRepository.findByEmail(loginRequest.getEmail());
            String token = jwtUtility.generateToken(userDetails);

            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(true)
                    .sameSite("None")
                    .path("/")
                    .maxAge(60 * 60 * 24)
                    .build();

//            Cookie cookie = new Cookie("jwt", token);
//            cookie.setHttpOnly(true);
//            cookie.setPath("/");
//            cookie.setMaxAge(24 * 60 * 60); // 1 day
//            response.addCookie(cookie);
            response.setHeader("Set-Cookie", cookie.toString());

            // ✅ Return only non-sensitive info
            return ResponseEntity.ok(Map.of(
                    "username", userDetails.getFullName(),
                    "role", userDetails.getRole()
            ));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        try{
            UserEntity userEntity = userService.register(registerRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Registration Successful!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The email already exists!");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> sendResetLink(@Valid @RequestBody ForgotPasswordRequest request){
        UserEntity user = userRepository.findByEmail(request.getEmail());
        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesn't exist!");
        }

        PasswordResetEntity currPasswordResetEntity = passResetRepository.findByUser(user);

        String token = UUID.randomUUID().toString();
        PasswordResetEntity passwordResetEntity = PasswordResetEntity.builder()
                .id(currPasswordResetEntity==null? 0 : currPasswordResetEntity.getId())
                .resetToken(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusMinutes(10))
                .build();
        passResetRepository.save(passwordResetEntity);
        String resetLink = FRONT_END + "/reset-password/" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("EchoRoom Password Reset");
        message.setText("Click here to reset your password: " + resetLink);
        mailSender.send(message);

        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request,
                                           @PathVariable String token)
    {
        PasswordResetEntity passwordResetEntity = passResetRepository.findByResetToken(token);

        if(passwordResetEntity == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reset URL!");
        }
        if(!passwordResetEntity.getExpiryDate().isAfter(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("URL Timed out!");
        }
        UserEntity user = userRepository.findById(passwordResetEntity.getUser().getId()).get();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body("Password has been successfully updated!");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request){
        String token = jwtUtility.extractTokenFromRequest(request);

        if(token == null )
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String email = jwtUtility.extractUserName(token);
        UserEntity user = userRepository.findByEmail(email);
        if(user == null || !jwtUtility.validateToken(user,token))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "username", user.getUsername(),
                "role", user.getRole()
        ));
    }

    @GetMapping("/ping")
    public ResponseEntity<?> pingMe(){
        return ResponseEntity.ok().build();
    }
}
