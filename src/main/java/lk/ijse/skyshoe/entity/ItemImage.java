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
public class ItemImage {
    @Id
    private String imgId;

    @Column(columnDefinition = "LONGTEXT")
    private String img;

    @OneToMany(mappedBy = "itemImage" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.LAZY)
    private List<Stock> stockList;

}
