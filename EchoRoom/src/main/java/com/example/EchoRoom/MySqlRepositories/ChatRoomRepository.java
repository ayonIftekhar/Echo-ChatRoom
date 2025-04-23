package com.example.EchoRoom.MySqlRepositories;

import com.example.EchoRoom.DatabaseEntity.ChatRoom;
import com.example.EchoRoom.DatabaseEntity.UserEntity;
import jakarta.persistence.Entity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {

    @EntityGraph(attributePaths = {"members","admin"})
    Optional<?> findByHandle(String handle);

    @EntityGraph(attributePaths = {"admin","members"})
    List<ChatRoom> findAll();

    @Query(value = """
            SELECT c.id,m 
            FROM ChatRoom c
            JOIN c.members m
            WHERE c.id in :room_ids
            """)
    List<Object[]> fetchMembersOfRooms(@Param("room_ids") List<Long> room_ids);

    @EntityGraph(attributePaths = {"admin"})
    Page<ChatRoom> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @EntityGraph(attributePaths = {"admin"})
    Page<ChatRoom> findByHandleContainingIgnoreCase(String handle, Pageable pageable);
    Page<ChatRoom> findByMembersContaining(UserEntity user,Pageable pageRequest);


}
