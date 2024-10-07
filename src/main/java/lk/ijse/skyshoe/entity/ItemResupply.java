package lk.ijse.skyshoe.entity;

import jakarta.persistence.*;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "item_resupply")
@Entity
public class ItemResupply {
    @ManyToOne
    @Id
    private Item item;

    @ManyToOne
    @Id
    private Resupply resupply;

    @Enumerated(EnumType.STRING)
    @Id
    private Size size;

    @Enumerated(EnumType.STRING)
    @Id
    private Colour colour;

    private int qty;

}
