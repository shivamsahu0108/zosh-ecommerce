package com.zosh.Modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.zosh.domain.USER_ROLE;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;

    private String fullName;

    private String mobile;

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;
    @OneToMany
    private Set<Address> addresses = new HashSet<>();
    @ManyToAny
    @JsonIgnore
    private Set<Coupon> usedCoupons = new HashSet<>();

}
