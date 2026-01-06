package com.zosh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.Address;
public interface AddressRepository extends JpaRepository<Address, Long> {

}
