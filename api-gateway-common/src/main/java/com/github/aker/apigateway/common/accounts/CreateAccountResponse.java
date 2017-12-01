package com.github.aker.apigateway.common.accounts;


public class CreateAccountResponse {
  
  private String accountId;

  public CreateAccountResponse() {
  }

  public CreateAccountResponse(String accountId) {
    this.accountId = accountId;
  }

  public String getAccountId() {
    return accountId;
  }

  public void setAccountId(String accountId) {
    this.accountId = accountId;
  }
}
