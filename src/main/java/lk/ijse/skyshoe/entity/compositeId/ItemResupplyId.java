package lk.ijse.skyshoe.entity.compositeId;

import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.Resupply;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
public class ItemResupplyId {
    private Item item;
    private Resupply resupply;
    private Colour colour;
    private Size size;


}
