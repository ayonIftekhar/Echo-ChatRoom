package com.example.EchoRoom.Services;

import com.example.EchoRoom.DTOs.Register.RegisterRequest;
import com.example.EchoRoom.DatabaseEntity.UserEntity;
import com.example.EchoRoom.MySqlRepositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public UserEntity register(RegisterRequest registerRequest) throws Exception{
        UserEntity userEntity = convertRegisterRequestToUser(registerRequest);
        userEntity = userRepository.save(userEntity);
        return userEntity;
    }

    private UserEntity convertRegisterRequestToUser(RegisterRequest registerRequest) {
        return UserEntity.builder()
                .userName(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .role("ROLE_USER")
                .build();
    }
}
