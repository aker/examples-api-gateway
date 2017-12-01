package com.github.aker.apigateway.commonauth.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.Token;
import org.springframework.security.core.token.TokenService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.aker.ermp.model.UserAccount;
import com.aker.ermp.model.UserCredentials;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.aker.apigateway.commonauth.UserAuthService;
import com.github.aker.apigateway.commonauth.model.ErrorResponse;
import com.github.aker.apigateway.commonauth.model.User;

@RestController
@Validated
@RequestMapping("/api")
public class AuthController {

  @Autowired
  private TokenService tokenService;

  @Autowired
  private UserAuthService customerAuthService;

  private static ObjectMapper objectMapper = new ObjectMapper();

  @RequestMapping(value = "/login", method = POST)
  public ResponseEntity<UserAccount> doAuth(@RequestBody @Valid UserCredentials request) throws IOException {
	  UserAccount customer = customerAuthService.findByEmailAndPassword(request.getEmail(), request.getPassword());

    Token token = tokenService.allocateToken(objectMapper.writeValueAsString(new User(request.getEmail())));
    return ResponseEntity.status(HttpStatus.OK).header("access-token", token.getKey())
            .body(customer);
  }

  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  @ExceptionHandler({EmptyResultDataAccessException.class, IncorrectResultSizeDataAccessException.class})
  public ErrorResponse customersNotFound() {
    return new ErrorResponse("Customer not found");
  }

  @RequestMapping(value = "/user", method = GET)
  public ResponseEntity<UserAccount> getCurrentUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    return ResponseEntity.status(HttpStatus.OK).body(customerAuthService.findByEmail(auth.getName()));
  }


}
