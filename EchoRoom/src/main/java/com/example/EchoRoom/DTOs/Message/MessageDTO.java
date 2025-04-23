package com.example.EchoRoom.DTOs.Message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class MessageDTO {
    private String sender;
    private String content;
    private String roomHandle;
}
