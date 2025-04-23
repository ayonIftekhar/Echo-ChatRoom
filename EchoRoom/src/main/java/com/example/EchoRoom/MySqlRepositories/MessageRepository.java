package com.example.EchoRoom.MySqlRepositories;

import com.example.EchoRoom.DatabaseEntity.ChatRoom;
import com.example.EchoRoom.DatabaseEntity.MessageEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,Long> {

    Page<MessageEntity> findByChatRoomOrderByTimeStampDesc(ChatRoom chatRoom , Pageable pageable);

    @Query("SELECT m FROM MessageEntity m WHERE m.chatRoom = :chatRoom AND m.timeStamp < :cursor ORDER BY m.timeStamp DESC ")
    Page<MessageEntity> findPreviousTexts(@Param("cursor") LocalDateTime cursor , @Param("chatRoom") ChatRoom chatRoom , Pageable pageable);
}
