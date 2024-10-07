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
    public ResponseEntity saveOrders(@RequestBody SaleOrderDTO saleOrderDTO) {

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
                System.out.println("req02 is :" + req02);
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(saleOrderDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

            } else if (req01.equals("06")) {

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(orderDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            System.out.println(orderDTO);
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("wrone Id");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

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


