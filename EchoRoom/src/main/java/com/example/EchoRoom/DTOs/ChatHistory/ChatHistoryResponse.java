package com.example.EchoRoom.DTOs.ChatHistory;

import com.example.EchoRoom.DTOs.Message.MessageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ChatHistoryResponse {
    private List<MessageDTO> messages;
    private int page;
    private boolean last;
    private LocalDateTime cursor;
}
