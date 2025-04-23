package com.example.EchoRoom.DatabaseEntity;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

//@Component
public class DevelopmentFix {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        try {
            // 1. Drop all FKs on admin_id
            List<String> fkNames = jdbcTemplate.queryForList("""
                SELECT CONSTRAINT_NAME
                FROM information_schema.TABLE_CONSTRAINTS
                WHERE TABLE_NAME = 'chat_room'
                  AND CONSTRAINT_TYPE = 'FOREIGN KEY'
                  AND CONSTRAINT_SCHEMA = DATABASE()
            """, String.class);

            for (String fk : fkNames) {
                System.out.println("🧨 Dropping FK: " + fk);
                jdbcTemplate.execute("ALTER TABLE chat_room DROP FOREIGN KEY " + fk);
            }

            // 2. Drop the UNIQUE index by name (manually known)
            jdbcTemplate.execute("ALTER TABLE chat_room DROP INDEX UKaiww44pxrw7egto4d4o8i12m");

            // 3. Optional: Add FK again
            jdbcTemplate.execute("""
                ALTER TABLE chat_room
                ADD CONSTRAINT fk_chatroom_admin
                FOREIGN KEY (admin_id)
                REFERENCES user_entity(id)
            """);

            System.out.println("✅ Cleanup complete");

        } catch (Exception e) {
            System.err.println("❌ Cleanup failed: " + e.getMessage());
        }
    }

}

