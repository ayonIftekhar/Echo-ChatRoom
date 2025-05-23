package com.example.EchoRoom.OAuth2Handler;

import com.example.EchoRoom.DatabaseEntity.UserEntity;
import com.example.EchoRoom.MySqlRepositories.UserRepository;
import com.example.EchoRoom.SecurityConfiguration.JwtUtility;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;

@Component
public class GoogleOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value("${frontend.origin}")
    private String FRONT_END_ORIGIN;

    @Value("${backend.origin}")
    private String BACK_END_ORIGIN;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtility jwtUtility;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");

        // Check if user exists
        if (userRepository.findByEmail(email) == null) {
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setUserName(oauthUser.getAttribute("name"));
            newUser.setRole("ROLE_USER");
            userRepository.save(newUser);
        }

        // Redirect to frontend
        String jwt = jwtUtility.generateToken(userRepository.findByEmail(email));

//        Cookie cookie = new Cookie("jwt", jwt);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
//        cookie.setPath("/");
//        cookie.set
//        cookie.setMaxAge(24 * 60 * 60);
//        response.addCookie(cookie);
//        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
//                .httpOnly(true)
//                .secure(true)
//                .sameSite("None") // mandatory for cross-origin cookies
//                .path("/")
//                .maxAge(60 * 60)
//                .build();
//
//        response.setHeader("Set-Cookie", cookie.toString());
        String redirectBridge = BACK_END_ORIGIN + "/cookie-bridge?token=" + jwt;
        response.sendRedirect(redirectBridge);
    }
}
