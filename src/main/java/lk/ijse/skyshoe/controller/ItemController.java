package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.ItemDTO;
import lk.ijse.skyshoe.dto.ResponseDTO;
import lk.ijse.skyshoe.service.CustomerService;
import lk.ijse.skyshoe.service.ItemService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ResponseDTO responseDTO;
    private final ItemService itemService;

    @PostMapping("saveItem")
    public ResponseEntity saveItem(@RequestBody ItemDTO itemDTO) {

        try {
            String req = itemService.save(itemDTO);
            if (req.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(itemDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CREATED);
            } else if (req.equals("06")) {

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(itemDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            System.out.println(itemDTO);
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("wrone Id");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PutMapping(value = "updateItem")
    public ResponseEntity updateItem(@RequestBody ItemDTO itemDTO){
        System.out.println(itemDTO);
        try {
            String req = itemService.update(itemDTO);
            if (req.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(itemDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (req.equals("01")){
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT REGISTERED EMPLOYEE");
                responseDTO.setContent(itemDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("zzzzzz");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping(value = "getAllItem")
    public ResponseEntity getAllItem() {
        try {
            List<ItemDTO> itemDTOList = itemService.getAll();

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(itemDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/getItem/{itmID}")
    public ResponseEntity getItem(@PathVariable String itmID){

        try {
            ItemDTO itemDTO = itemService.getSelected(itmID);
            if (itemDTO !=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(itemDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteItem/{itmID}")
    public ResponseEntity deleteItem(@PathVariable String itmID){

        try {
            String req = itemService.delete(itmID);
            if (req.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Employee Available For This ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
