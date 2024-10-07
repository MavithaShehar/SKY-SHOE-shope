package lk.ijse.skyshoe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
//@Data
@ToString
@Setter
@Getter
@Entity
public class Item {
    @Id
    private String itemCode;
    private String description;
    private String category;
    private double priceBuy;
    private double priceSell;

    @Column(columnDefinition = "LONGTEXT")
    private String itemImg;
    //
    @ManyToOne(fetch = FetchType.EAGER)
    //@JsonManagedReference
    private Suppliers suppliers;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemSale> itemSaleList;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Stock> stockList;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemResupply> itemResupplyList;

}