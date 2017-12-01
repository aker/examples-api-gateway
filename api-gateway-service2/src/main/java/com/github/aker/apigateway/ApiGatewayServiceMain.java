package com.github.aker.apigateway;

import org.springframework.boot.SpringApplication;

import com.github.aker.apigateway.web.ApiGatewayServiceConfiguration;

/**
 * Created by Main on 19.01.2016.
 */
public class ApiGatewayServiceMain {
  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayServiceConfiguration.class, args);
  }
}
