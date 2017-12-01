package com.github.aker.apigateway.common.customers;

public class AddToAccountResponse {

  private String version;

  public AddToAccountResponse() {
  }

  public AddToAccountResponse(String version) {
    this.version = version;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }
}
