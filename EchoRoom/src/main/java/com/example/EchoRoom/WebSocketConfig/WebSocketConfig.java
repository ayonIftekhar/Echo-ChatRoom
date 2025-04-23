package com.example.EchoRoom.WebSocketConfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${frontend.origin}")
    private String FRONTEND_ORIGIN;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // This is where the frontend connects (e.g., http://localhost:8080/ws)
        registry.addEndpoint("/ws").setAllowedOriginPatterns(FRONTEND_ORIGIN).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // All messages sent to backend should start with this prefix
        registry.setApplicationDestinationPrefixes("/app");

        // All messages sent back to clients will start with this
        registry.enableSimpleBroker("/topic");
    }
}
