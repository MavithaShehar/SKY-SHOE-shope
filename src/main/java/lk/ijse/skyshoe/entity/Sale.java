package lk.ijse.skyshoe.entity;


import jakarta.persistence.*;
import lk.ijse.skyshoe.entity.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Sale {
    @Id
    private String oId;
    private String itemQty;
    private double totalPrice;
    private Date date;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private int points;

    @ManyToOne(fetch = FetchType.EAGER)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Employee employee;

    @OneToMany(mappedBy = "sale" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.EAGER)
    private List<ItemSale> itemSaleList;



}
