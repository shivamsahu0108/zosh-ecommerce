package com.zosh.Modal;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToOne
    private User user;

    @OneToOne
    private Seller seller;

}
