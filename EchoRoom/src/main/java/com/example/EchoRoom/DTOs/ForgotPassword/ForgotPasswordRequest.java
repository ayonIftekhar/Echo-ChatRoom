package com.example.EchoRoom.DTOs.ForgotPassword;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ForgotPasswordRequest {
    @NotNull
    String email;
}
