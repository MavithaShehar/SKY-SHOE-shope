package lk.ijse.skyshoe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemsDTO {

    private String itemSaleId;

    private List<ItemDataDTO> itemData;
}
