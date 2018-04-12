/**
 * Created by andrew on 12/03/16.
 */
import * as ENDPOINTS from './apiEndpoints';
import root from './root';

const JSON_HEADERS = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
};

const METHODS = {
  DELETE: {
    ...JSON_HEADERS,
    method: "delete"
  },
  GET: {
    ...JSON_HEADERS,
    method: "get"
  },
  POST: {
    ...JSON_HEADERS,
    method: "post"
  }
};

export const apiSignUp = (body) => fetch(ENDPOINTS.emailSignUp(), {
  ...METHODS.POST,
  body: root.JSON.stringify(body)
});