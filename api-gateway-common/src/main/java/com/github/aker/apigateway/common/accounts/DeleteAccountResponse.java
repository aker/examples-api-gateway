package com.github.aker.apigateway.common.accounts;


public class DeleteAccountResponse {

  private String accountId;

  public DeleteAccountResponse() {
  }

  public DeleteAccountResponse(String accountId) {
    this.accountId = accountId;
  }

  public String getAccountId() {
    return accountId;
  }

  public void setAccountId(String accountId) {
    this.accountId = accountId;
  }
}
