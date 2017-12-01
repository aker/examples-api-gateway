package com.github.aker.apigateway.commonauth;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.token.KeyBasedPersistenceTokenService;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.aker.ermp.UserRepository;
import com.aker.ermp.model.UserAccount;
import com.github.aker.apigateway.commonauth.filter.StatelessAuthenticationFilter;

@Configuration
@ComponentScan
@EnableWebSecurity
@EnableConfigurationProperties({AuthProperties.class})
public class AuthConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  private AuthProperties securityProperties;

  @Autowired
  private TokenAuthenticationService tokenAuthenticationService;

  @Autowired
  private UserAuthService userAuthService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsServiceBean());
  }

  @Override
  public UserDetailsService userDetailsServiceBean() {
    return email -> {
    	UserAccount user = userAuthService.findByEmail(email);
      return new User(email, user.getPassword(), true, true, true, true,
              AuthorityUtils.createAuthorityList("USER"));
    };
  }

  @Bean
  public UserAuthService userAuthService(UserRepository userAuthRepository) {
    return new UserAuthService(userAuthRepository);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .csrf()
              .disable()
            .httpBasic()
              .and()
            .authorizeRequests()
              .antMatchers(HttpMethod.POST, "/api/users", "/api/login").permitAll()
              .antMatchers("/api/**").permitAll()
              .anyRequest().permitAll()
              .and()
            .addFilterAfter(new StatelessAuthenticationFilter(tokenAuthenticationService), BasicAuthenticationFilter.class);
  }

  @Bean
  public TokenService tokenService() {
    KeyBasedPersistenceTokenService res = new KeyBasedPersistenceTokenService();
    res.setSecureRandom(new SecureRandom());
    res.setServerSecret(securityProperties.getServerSecret());
    res.setServerInteger(securityProperties.getServerInteger());

    return res;
  }
}
