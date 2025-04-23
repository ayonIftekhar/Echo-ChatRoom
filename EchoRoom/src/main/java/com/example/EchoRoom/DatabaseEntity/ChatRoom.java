package com.example.EchoRoom.DatabaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(indexes = @Index(columnList = "handle"))
public class ChatRoom {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String handle;

    private String description;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "admin_id" , referencedColumnName = "id")
    private UserEntity admin;

    @ManyToMany
    private Set<UserEntity> members;

}
