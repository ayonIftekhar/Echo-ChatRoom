package com.example.EchoRoom.DTOs.AllRooms;

import com.example.EchoRoom.DatabaseEntity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class AllRoomsDTO {
    String name;
    String description;
    String handle;
    String type;
    List<UserEntity> users ;
}
