package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.ItemDataDTO;
import lk.ijse.skyshoe.dto.SaleOrderDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Employee;
import lk.ijse.skyshoe.entity.ItemSale;
import lk.ijse.skyshoe.entity.Sale;
import lk.ijse.skyshoe.repo.CustomerRepo;
import lk.ijse.skyshoe.repo.ItemSaleRepo;
import lk.ijse.skyshoe.service.ItemSaleService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor

public class ItemSaleServiceIMPL implements ItemSaleService {

    private final ItemSaleRepo itemSaleRepo;
    private final ModelMapper modelMapper;


    @Override
    public String save(SaleOrderDTO saleOrderDTO) {

        List<ItemDataDTO> itemDataList = saleOrderDTO.getItemData();

        if (itemDataList != null) {
            for (ItemDataDTO itemDataDTO : itemDataList) {

                UUID uuid = UUID.randomUUID();
                String uuidString = uuid.toString();
                String newItemSaleId = uuidString.substring(0, Math.min(uuidString.length(), 5));
                itemDataDTO.setItemSaleId(newItemSaleId);

                if (itemSaleRepo.existsById(itemDataDTO.getItemSaleId())) {
                    return VarList.RSP_DUPLICATED;
                } else {
                    ItemSale itemSale = new ItemSale(
                            itemDataDTO.getItemSaleId(),
                            itemDataDTO.getItemImg(),
                            saleOrderDTO.getOrderId(),
                            itemDataDTO.getItemCode(),
                            null,
                            itemDataDTO.getSize(),
                            itemDataDTO.getColour(),
                            itemDataDTO.getQty()
                    );

                    itemSaleRepo.save(itemSale);
                }
            }
            return VarList.RSP_SUCCESS;
        } else {
            System.out.println("Item data list is empty");
            return VarList.RSP_FAIL;
        }
    }

    @Override
    public String update(SaleOrderDTO dto) {
        return null;
    }

    @Override
    public SaleOrderDTO getSelected(String id) {
        return null;
    }

    @Override
    public List<SaleOrderDTO> getAll() {

        return null;
    }

    @Override
    public String delete(String id) {
        return null;
    }


}
