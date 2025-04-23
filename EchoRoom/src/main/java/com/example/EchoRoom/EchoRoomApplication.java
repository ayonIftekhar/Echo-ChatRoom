package com.example.EchoRoom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableMethodSecurity(prePostEnabled = true)
public class EchoRoomApplication {

	public static void main(String[] args) {
		SpringApplication.run(EchoRoomApplication.class, args);
	}

}
