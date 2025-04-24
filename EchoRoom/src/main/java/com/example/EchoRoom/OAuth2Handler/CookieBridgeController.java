package com.example.EchoRoom.OAuth2Handler;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CookieBridgeController {

    @GetMapping("/cookie-bridge")
    public void setCookieAndRedirect(@RequestParam("token") String token, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(60 * 60)
                .build();

        response.setHeader("Set-Cookie", cookie.toString());
        response.setStatus(302);
        response.setHeader("Location", "https://echo-chat-room.vercel.app/oauth-success");
    }
}
