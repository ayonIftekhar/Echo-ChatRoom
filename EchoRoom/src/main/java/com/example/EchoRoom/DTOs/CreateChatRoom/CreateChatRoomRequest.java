package com.example.EchoRoom.DTOs.CreateChatRoom;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateChatRoomRequest {
    @NotNull
    private String name;
    @NotNull
    private String handle;
    @NotNull
    private String description;
    @NotNull
    private String type;
}
