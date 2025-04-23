package com.example.EchoRoom.DatabaseEntity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
@Table(indexes = @Index(columnList = "timeStamp"))
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String sender;
    private String content;
    private LocalDateTime timeStamp;

    @ManyToOne
    private ChatRoom chatRoom;
}
