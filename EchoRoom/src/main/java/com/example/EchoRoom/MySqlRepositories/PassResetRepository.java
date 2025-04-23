package com.example.EchoRoom.MySqlRepositories;

import com.example.EchoRoom.DatabaseEntity.PasswordResetEntity;
import com.example.EchoRoom.DatabaseEntity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassResetRepository extends JpaRepository<PasswordResetEntity,Long> {
    PasswordResetEntity findByUser(UserEntity user);

    PasswordResetEntity findByResetToken(String resetToken);
}
