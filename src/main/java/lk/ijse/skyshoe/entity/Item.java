package lk.ijse.skyshoe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Item {
    @Id
    private String iCode;
    private String description;
    private String category;
    private double priceBuy;
    private double priceSell;

    @OneToMany(mappedBy = "item" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.LAZY)
    private List<ItemSale> itemSaleList;

    @ManyToOne(fetch = FetchType.EAGER)
    private Supplier supplier;

    @OneToMany(mappedBy = "item" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.LAZY)
    private List<Stock> stockList;

    @OneToMany(mappedBy = "item" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.LAZY)
    private List<ItemResupply> itemResupplyList;


}
