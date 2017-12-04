package com.github.aker.apigateway.commonauth;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.token.KeyBasedPersistenceTokenService;
import org.springframework.security.core.token.TokenService;

import com.aker.ermp.UserRepository;

@Configuration
@ComponentScan
@EnableConfigurationProperties({ AuthProperties.class })
@EntityScan("com.aker.ermp")
@EnableJpaRepositories("com.aker.ermp")
@Import({ WebSecurityConfiguration.class })
public class AuthConfiguration {

	@Autowired
	private AuthProperties securityProperties;

	@Bean
	public UserAuthService userAuthService(UserRepository userAuthRepository) {
		return new UserAuthService(userAuthRepository);
	}

	@Bean
	public TokenService tokenService() {
		KeyBasedPersistenceTokenService res = new KeyBasedPersistenceTokenService();
		res.setSecureRandom(new SecureRandom());
		res.setServerSecret("the_cake_is_a_lie");
		res.setServerInteger(1);

		return res;
	}

	@Bean
	public TokenAuthenticationService tokenAuthenticationService(TokenService tokenService) {
		return new TokenAuthenticationService(tokenService);
	}
}