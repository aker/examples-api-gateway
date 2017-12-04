package com.github.aker.apigateway.commonauth;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.token.Token;
import org.springframework.security.core.token.TokenService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.aker.apigateway.commonauth.model.User;
import com.github.aker.apigateway.commonauth.model.UserAuthentication;

public class TokenAuthenticationService {

  private TokenService tokenService;

  private static final String AUTH_HEADER_NAME = "access-token";
  private static final long DAY = 1000 * 60 * 60 * 24;

  private ObjectMapper mapper = new ObjectMapper();

  public TokenAuthenticationService(TokenService tokenService) {
	  this.tokenService = tokenService;
  }
  
  public Authentication getAuthentication(HttpServletRequest request) throws IOException {
    final String tokenString = request.getHeader(AUTH_HEADER_NAME);

    if (tokenString != null) {
      Token token = tokenService.verifyToken(tokenString);
      final User user = mapper.readValue(token.getExtendedInformation(), User.class);

      if (user != null && (System.currentTimeMillis() - token.getKeyCreationTime()) < DAY) {
        return new UserAuthentication(user);
      }
    }
    return null;
  }

}
