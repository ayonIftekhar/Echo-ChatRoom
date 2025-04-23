package com.example.EchoRoom.DTOs.ChatHistory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatHistoryRequest {

    private int page;
    private String handle;
    private LocalDateTime time;
}
