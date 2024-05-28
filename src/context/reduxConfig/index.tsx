import {combineReducers} from 'redux';
import formItems, {addFormItem} from './reducers/formItems';
import {formItemsProps} from '../../common/types';
import {actionStateProps} from '../types';

// Define the shape of your state manually
type StateProps = {
  formItems: {formItems: formItemsProps[]};
};

const appReducer = combineReducers({
  formItems,
});

export default (
  state: StateProps | undefined,
  action: actionStateProps,
): StateProps => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const actions = {
  addFormItem,
};
