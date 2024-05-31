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

//    @Override
//    public String toString() {
//        return "Item{" +
//                "itemCode='" + itemCode + '\'' +
//                ", description='" + description + '\'' +
//                ", category='" + category + '\'' +
//                ", priceBuy=" + priceBuy +
//                ", priceSell=" + priceSell +
//                ", stockList=" + stockList +
//                '}';
//    }
//
//    @Override
//    public boolean equals(Object o) {
////        if (this == o) return true;
////        if (o == null || getClass() != o.getClass()) return false;
////        Item item = (Item) o;
////        return Double.compare(item.priceBuy, priceBuy) == 0 && Double.compare(item.priceSell, priceSell) == 0 && Objects.equals(itemCode, item.itemCode) && Objects.equals(description, item.description) && Objects.equals(category, item.category) && Objects.equals(suppliers, item.suppliers) && Objects.equals(itemSaleList, item.itemSaleList) && Objects.equals(stockList, item.stockList) && Objects.equals(itemResupplyList, item.itemResupplyList);
//        return false;
//    }
//
//    @Override
//    public int hashCode() {
////        return Objects.hash(itemCode, description, category, priceBuy, priceSell, suppliers, itemSaleList, stockList, itemResupplyList);
//        return 0;
//    }
}
