package stanic.marija.service;

import java.util.List;

import stanic.marija.model.Role;

public interface RoleService {

	List<Role> getRoles();
	
	Role findById(int id);
	 
    Role findByType(String type);
	
}