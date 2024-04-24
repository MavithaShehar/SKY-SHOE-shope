package lk.ijse.skyshoe.entity.compositeId;

import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
public class StockId implements Serializable {
    private Size size;
    private Colour colour;
    private Item item;

}
