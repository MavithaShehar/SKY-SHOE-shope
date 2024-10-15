package lk.ijse.skyshoe.controller;


import lk.ijse.skyshoe.dto.*;
import lk.ijse.skyshoe.service.ItemSaleService;
import lk.ijse.skyshoe.service.SaleService;
import lk.ijse.skyshoe.dto.getItemSaleDTO;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("api/v1/sale")
@RequiredArgsConstructor

public class SaleController {

    private final ResponseDTO responseDTO;
    private final SaleService saleService;
    private final ItemSaleService itemSaleService;


    @PostMapping("save")
    public String saveOrders(@RequestBody SaleOrderDTO saleOrderDTO) {

        System.out.println("sale controller is "+saleOrderDTO);

        OrderDTO orderDTO = new OrderDTO(
                saleOrderDTO.getOrderId(),
                saleOrderDTO.getOrderItemDate(),
                saleOrderDTO.getOrderItemQty(),
                saleOrderDTO.getPaymentOption(),
                saleOrderDTO.getPoints(),
                saleOrderDTO.getTotalPrice(),
                saleOrderDTO.getCustomerId(),
                saleOrderDTO.getEmployeeId()
        );

        try {
            String req01 = saleService.save(orderDTO);
            if (req01.equals("00")) {
                String req02 = itemSaleService.save(saleOrderDTO);

                return "success  "+req02;

            } else if (req01.equals("06")) {

                return "not success  "+req01;

            } else {
                return "ERROR";
            }
        } catch (Exception ex) {
            return "ERROR Exception";
        }
    }

    @PostMapping("health")
    public void health(@RequestBody SaleOrderDTO saleOrderDTO) {

        System.out.println("sale is **** "+saleOrderDTO);

    }

    @GetMapping
    public ResponseEntity getAll() {
        try {
            List<getItemSaleDTO>getItemSaleDTOList = saleService.getAllOrders();

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(getItemSaleDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}


