package lk.ijse.skyshoe.service;

import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.CustomerDTORecode;

import java.util.List;

public interface CrudService<T,S> {

    String save(T dto);
    String update(T dto);
    T getSelected(S id);
    List<T> getAll();
    String delete(S id);

}
