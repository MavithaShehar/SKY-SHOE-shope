package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.dto.*;
import lk.ijse.skyshoe.service.ResuplyService;
import lk.ijse.skyshoe.service.StockService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/inventory")
@RequiredArgsConstructor

public class InventoryController {

    private final ResponseDTO responseDTO;
    private final StockService stockService;
    private final ResuplyService resuplyService;
    public StockDTO stockDTO;
    public ResupplyDTO resupplyDTO;

    @PostMapping("/saveInventory")
    public ResponseEntity saveInventory(@RequestBody InventoryDTO inventoryDTO) {

        System.out.println("save inventory hear");

        stockDTO = new StockDTO(
                inventoryDTO.getSize(),
                inventoryDTO.getQty(),
                inventoryDTO.getMaxQty(),
                inventoryDTO.getColour(),
                inventoryDTO.getStatus(),
                inventoryDTO.getItem(),
                inventoryDTO.getItemImage()
                );
        resupplyDTO =new ResupplyDTO(
                null,
                inventoryDTO.getDate(),
                inventoryDTO.getTotalValue(),
                inventoryDTO.getQty()
        );

        try {

             String req01 = stockService.save(stockDTO);
            System.out.println("req02 is Success ");
            if (req01.equals("00")) {
               String req02 = resuplyService.save(resupplyDTO);
               System.out.println("req02 is :"+req02);
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(inventoryDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CREATED);
            } else if (req01.equals("06")) {

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(inventoryDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("wrone Id");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/updateInventory")
    public ResponseEntity updateInventory(@RequestBody InventoryDTO inventoryDTO) {

        System.out.println("save inventory hear");

        stockDTO = new StockDTO(
                inventoryDTO.getSize(),
                inventoryDTO.getQty(),
                inventoryDTO.getMaxQty(),
                inventoryDTO.getColour(),
                inventoryDTO.getStatus(),
                inventoryDTO.getItem(),
                inventoryDTO.getItemImage()
        );
        resupplyDTO =new ResupplyDTO(
                null,
                inventoryDTO.getDate(),
                inventoryDTO.getTotalValue(),
                inventoryDTO.getQty()
        );

        try {

            String req01 = stockService.save(stockDTO);
            System.out.println("req02 is Success ");
            if (req01.equals("00")) {
                String req02 = resuplyService.save(resupplyDTO);
                System.out.println("req02 is :"+req02);
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(inventoryDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CREATED);
            } else if (req01.equals("06")) {

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(inventoryDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("wrone Id");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @GetMapping(value = "getAllInventory")
    public ResponseEntity getAllInventory() {
        try {
            List<getStockDTO> getStockDTOS = stockService.getAllData();


            System.out.println("///////////////////////////////////");



           responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(getStockDTOS);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @GetMapping("/getInventory")
    public String saveInventory() {

        return "Inventory is hear";
    }

}
