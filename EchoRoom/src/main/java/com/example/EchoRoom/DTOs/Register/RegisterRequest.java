package com.example.EchoRoom.DTOs.Register;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRequest {
    @NotNull
    String name;
    @NotNull
    String email;
    @NotNull
    String password;
    @NotNull
    String phone;
}
