package lk.ijse.skyshoe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ResupplyDTO {
    private String resupplyId;
    private String date;
    private double totalValue;
    private int totalQty;
}
