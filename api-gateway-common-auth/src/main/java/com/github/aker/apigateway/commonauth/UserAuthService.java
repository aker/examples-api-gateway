package com.github.aker.apigateway.commonauth;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.support.DataAccessUtils;

import com.aker.ermp.UserRepository;
import com.aker.ermp.model.UserAccount;

public class UserAuthService {
  private UserRepository userRepository;

  public UserAuthService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserAccount findByEmail(String email) {
	  UserAccount result = DataAccessUtils.uniqueResult(userRepository.findByEmail(email));
    if (result==null)
      throw new EmptyResultDataAccessException(1);

    return result;
  }

  public UserAccount findByEmailAndPassword(String email, String password) {
	  UserAccount result =  DataAccessUtils.uniqueResult(userRepository.findByEmailAndPassword(email, password));
    if (result==null)
      throw new EmptyResultDataAccessException(1);

    return result;
  }
}
