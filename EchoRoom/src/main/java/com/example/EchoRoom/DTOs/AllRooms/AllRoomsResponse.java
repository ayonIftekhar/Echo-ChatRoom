package com.example.EchoRoom.DTOs.AllRooms;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class AllRoomsResponse {
    int page;
    boolean last ;
    List<AllRoomsDTO> allRooms ;
}
