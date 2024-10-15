package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.ItemDTO;
import lk.ijse.skyshoe.dto.ItemSaleDTO;
import lk.ijse.skyshoe.dto.OrderDTO;
import lk.ijse.skyshoe.dto.getItemSaleDTO;
import lk.ijse.skyshoe.entity.ItemSale;
import lk.ijse.skyshoe.entity.Sale;
import lk.ijse.skyshoe.repo.SaleRepo;
import lk.ijse.skyshoe.service.SaleService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor

public class SaleServiceIMPL implements SaleService {

    private final SaleRepo saleRepo;
    private final ModelMapper modelMapper;


    @Override
    public String save(OrderDTO orderDTO) {
        if (saleRepo.existsById(orderDTO.getOrderId().getOrderId())){
            return VarList.RSP_DUPLICATED;
        }else {
            Sale sale = new Sale(
                    orderDTO.getOrderId().getOrderId(),
                    Integer.toString(orderDTO.getOrderItemQty()),
                    orderDTO.getTotalPrice(),
                    orderDTO.getOrderItemDate(),
                    orderDTO.getPaymentOption(),
                    orderDTO.getPoints(),
                    orderDTO.getCustomerId(),
                    orderDTO.getEmployeeId(),
                    null

            );
            saleRepo.save(sale);
            return VarList.RSP_SUCCESS;
        }
    }

    @Override
    public String update(OrderDTO dto) {
        return null;
    }

    @Override
    public OrderDTO getSelected(String id) {
        return null;
    }

    @Override
    public List<OrderDTO> getAll() {
      return null;
    }

    @Override
    public String delete(String id) {
        return null;
    }

    @Override
    public List<getItemSaleDTO> getAllOrders() {
        List<Sale> saleList = saleRepo.findAll();
        List<getItemSaleDTO> getItemSaleDTOList = new ArrayList<>();

        for (Sale sale : saleList ){

            List<ItemSaleDTO> itemSaleDTOList = new ArrayList<>();

            for (ItemSale itemSale : sale.getItemSaleList() ){

                ItemDTO itemDTO = new ItemDTO(
                        itemSale.getItem().getItemCode(),
                        itemSale.getItem().getDescription(),
                        itemSale.getItem().getCategory(),
                        itemSale.getItem().getPriceBuy(),
                        itemSale.getItem().getPriceSell(),
                        itemSale.getItem().getItemImg(),
                        null
                );

                ItemSaleDTO itemSaleDTO = new ItemSaleDTO(

                itemSale.getItemSaleId(),
                null,
                itemDTO,
                null,
                itemSale.getSize(),
                itemSale.getColour(),
                itemSale.getQty(),
                itemSale.getItemImg()

                );

                itemSaleDTOList.add(itemSaleDTO);
            }

            getItemSaleDTO getItemSaleDTO = new getItemSaleDTO(

            sale.getOrderId(),
            sale.getItemQty(),
            sale.getTotalPrice(),
            sale.getDate(),
            sale.getPaymentMethod(),
            sale.getPoints(),
            sale.getCustomer().getCustomerId(),
            sale.getEmployee().getEmployeeId(),
            itemSaleDTOList

            );

            getItemSaleDTOList.add(getItemSaleDTO);

        }


        return getItemSaleDTOList;
        //return modelMapper.map(itemSaleList,new TypeToken<ArrayList<getItemSaleDTO>>(){}.getType());

    }
}
