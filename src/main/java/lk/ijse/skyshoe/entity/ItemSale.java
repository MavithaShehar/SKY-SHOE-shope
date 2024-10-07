package lk.ijse.skyshoe.entity;

import jakarta.persistence.*;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ItemSale {
    @Id
    private String itemSaleId;

    @Column(columnDefinition = "LONGTEXT")
    private String itemImg;

    @ManyToOne
    private Sale sale;
    @ManyToOne
    private Item item;
    @OneToMany(mappedBy = "itemSale")
    private List<Refund> refundList;


    @Enumerated(EnumType.STRING)
    private Size size;

    @Enumerated(EnumType.STRING)
    private Colour colour;

    private int qty;

}
