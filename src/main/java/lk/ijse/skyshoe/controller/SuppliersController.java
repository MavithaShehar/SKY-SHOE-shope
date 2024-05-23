package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.dto.ResponseDTO;
import lk.ijse.skyshoe.dto.SuppliersDTO;
import lk.ijse.skyshoe.service.SuppliersService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/suppliers")
@RequiredArgsConstructor

public class SuppliersController {
    private final ResponseDTO responseDTO;
    private final SuppliersService suppliersService;


    @PostMapping("saveSuppliers")
    public ResponseEntity saveSuppliers(@RequestBody SuppliersDTO suppliersDTO) {
        System.out.println("im am hear");
        try {
            String req = suppliersService.save(suppliersDTO);
            if (req.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(suppliersDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CREATED);
            } else if (req.equals("06")) {

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(suppliersDTO);
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

    @PutMapping(value = "updateSuppliers")
    public ResponseEntity updateSuppliers(@RequestBody SuppliersDTO suppliersDTO){

        try {
            String req = suppliersService.update(suppliersDTO);
            if (req.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(suppliersDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (req.equals("01")){
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("NOT REGISTERED EMPLOYEE");
                responseDTO.setContent(suppliersDTO);
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

    @GetMapping(value = "getAllSuppliers")
    public ResponseEntity getAllCustomer() {
        try {
            List<SuppliersDTO> suppliersDTOList = suppliersService.getAll();

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(suppliersDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/getSuppliers/{supID}")
    public ResponseEntity getCustomer(@PathVariable String supID){

        try {
            SuppliersDTO suppliersDTO = suppliersService.getSelected(supID);
            if (suppliersDTO !=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(suppliersDTO);
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

    @DeleteMapping("/deleteSuppliers/{supID}")
    public ResponseEntity delete(@PathVariable String supID){

        try {
            String req = suppliersService.delete(supID);
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
