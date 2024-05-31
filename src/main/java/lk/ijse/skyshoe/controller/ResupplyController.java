package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.ResponseDTO;
import lk.ijse.skyshoe.dto.ResupplyDTO;
import lk.ijse.skyshoe.service.CustomerService;
import lk.ijse.skyshoe.service.ResuplyService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/resupply")
@RequiredArgsConstructor
public class ResupplyController {

    private final ResponseDTO responseDTO;
    private final ResuplyService resuplyService;


    @GetMapping(value = "getAllResupply")
    public ResponseEntity getAllCustomer() {
        try {
            List<ResupplyDTO> responseDTOList = resuplyService.getAll();

            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(responseDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
