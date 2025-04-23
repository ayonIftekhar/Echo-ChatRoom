package com.example.EchoRoom.DatabaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class PasswordResetEntity {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true,nullable = false)
    private String resetToken;

    private LocalDateTime expiryDate;

    @OneToOne
    @JoinColumn(name = "user_id" , referencedColumnName = "id")
    private UserEntity user;

}
