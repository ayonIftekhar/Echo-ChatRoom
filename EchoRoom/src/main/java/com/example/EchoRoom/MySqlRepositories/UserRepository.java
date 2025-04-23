package com.example.EchoRoom.MySqlRepositories;

import com.example.EchoRoom.DatabaseEntity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    UserEntity findByEmail(String email);
    UserEntity findByUserName(String userName);
}
