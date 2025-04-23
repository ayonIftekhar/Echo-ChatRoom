package com.example.EchoRoom.Controller;

import com.example.EchoRoom.DTOs.Message.MessageDTO;
import com.example.EchoRoom.DatabaseEntity.ChatRoom;
import com.example.EchoRoom.DatabaseEntity.MessageEntity;
import com.example.EchoRoom.MySqlRepositories.ChatRoomRepository;
import com.example.EchoRoom.MySqlRepositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{handle}")
    public void receiveAndSend(@DestinationVariable String handle, MessageDTO dto) {
        ChatRoom room = (ChatRoom) chatRoomRepository.findByHandle(handle)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Save message
        MessageEntity message = MessageEntity.builder()
                .chatRoom(room)
                .content(dto.getContent())
                .sender(dto.getSender())
                .timeStamp(LocalDateTime.now())
                .build();

        messageRepository.save(message);

        // Send live to clients
        messagingTemplate.convertAndSend("/topic/chat/" + handle, dto);
    }
}
