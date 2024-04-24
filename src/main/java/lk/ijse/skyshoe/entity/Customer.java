package lk.ijse.skyshoe.entity;

import jakarta.persistence.*;
import lk.ijse.skyshoe.entity.enums.Gender;
import lk.ijse.skyshoe.entity.enums.LoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Customer {
    @Id
    private String customerId;
    private String customerName;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Date joinDate;

    @Enumerated(EnumType.STRING)
    private LoyaltyLevel level;

    private int totalPoints;
    private Date birthday;
    private String contactNo;

    @Column(unique = true)
    private String email;

    private String addressNoOrName;
    private String addressLane;
    private String addressCity;
    private String addressState;
    private String postalCode;

  //  @OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.LAZY)
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    private List<Sale> saleList;

}
