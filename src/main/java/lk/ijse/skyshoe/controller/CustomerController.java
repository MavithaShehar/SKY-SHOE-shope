package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.ResponseDTO;
import lk.ijse.skyshoe.service.CustomerService;
import lk.ijse.skyshoe.util.VarLIst;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@RequiredArgsConstructor

public class CustomerController {

    private final ResponseDTO responseDTO;
    private final CustomerService customerService;

    @PostMapping("saveCustomer")
    public ResponseEntity saveCustomer(@RequestBody CustomerDTO customerDTO) {

        try {
            String req = customerService.saveCustomer(customerDTO);
            if (req.equals("00")) {
                responseDTO.setCode(VarLIst.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(customerDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CREATED);
            } else if (req.equals("06")) {

                responseDTO.setCode(VarLIst.RSP_DUPLICATED);
                responseDTO.setMessage("NOT SUCCESS");
                responseDTO.setContent(customerDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarLIst.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            System.out.println(customerDTO);
            responseDTO.setCode(VarLIst.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("wrone Id");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PutMapping(value = "updateCustomer")
    public ResponseEntity updateCustomer(@RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        try {
            String req = customerService.updateCustomer(customerDTO);
            if (req.equals("00")){
                responseDTO.setCode(VarLIst.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(customerDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (req.equals("01")){
                responseDTO.setCode(VarLIst.RSP_DUPLICATED);
                responseDTO.setMessage("NOT REGISTERED EMPLOYEE");
                responseDTO.setContent(customerDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }else {
                responseDTO.setCode(VarLIst.RSP_FAIL);
                responseDTO.setMessage("ERROR");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarLIst.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent("zzzzzz");
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping(value = "getAllCustomer")
    public ResponseEntity getAllCustomer() {
        try {
            List<CustomerDTO> customerDTOList = customerService.getAllCustomers();

            responseDTO.setCode(VarLIst.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(customerDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarLIst.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

        @GetMapping("/getCustomer/{custID}")
        public ResponseEntity getCustomer(@PathVariable String custID){

            try {
                CustomerDTO customerDTO = customerService.getSelectedCustomer(custID);
                if (customerDTO !=null){
                    responseDTO.setCode(VarLIst.RSP_SUCCESS);
                    responseDTO.setMessage("SUCCESS");
                    responseDTO.setContent(customerDTO);
                    return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

                }else {
                    responseDTO.setCode(VarLIst.RSP_FAIL);
                    responseDTO.setMessage("ERROR");
                    responseDTO.setContent(null);
                    return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
                }
            }catch (Exception ex){
                responseDTO.setCode(VarLIst.RSP_ERROR);
                responseDTO.setMessage(ex.getMessage());
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @DeleteMapping("/deleteCustomer/{custID}")
    public ResponseEntity deleteCustomer(@PathVariable String custID){

        try {
            String req = customerService.deleteCustomer(custID);
            if (req.equals("00")){
                responseDTO.setCode(VarLIst.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else {
                responseDTO.setCode(VarLIst.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Employee Available For This ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarLIst.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}



