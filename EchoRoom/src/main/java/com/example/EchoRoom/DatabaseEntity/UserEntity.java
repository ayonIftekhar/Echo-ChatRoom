package com.example.EchoRoom.DatabaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(columnList = "userName"))
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true)
    private String userName;

    @Column(unique = true)
    private String email;

    private String password;

    private String phone;

    private String role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public String getEmail() { return email; }

    public Long getId() { return id; }

    public String getPhone() {return phone;}

    public String getRole() {return role;}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setEmail(String email){this.email = email ;}

    public void setUserName(String userName){this.userName = userName;}

    public void setRole(String role){this.role = role;}

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getFullName(){return this.userName;}

}
