/**
 * Created by andrew on 26/02/16.
 */
import T from '../constants/ACTION_TYPES';
import { makeActionCreator } from '../utils/actions';

export const emailSignInFormUpdate = makeActionCreator(T.AUTH.SIGN_IN_FORM_UPDATE, 'key', 'value');
export const emailSignInStart = makeActionCreator(T.AUTH.SIGN_IN_START);
export const emailSignInComplete = makeActionCreator(T.AUTH.SIGN_IN_COMPLETE, 'user');
export const emailSignInError = makeActionCreator(T.AUTH.SIGN_IN_ERROR, 'error');