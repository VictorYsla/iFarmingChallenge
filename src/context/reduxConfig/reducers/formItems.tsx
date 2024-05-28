import {formItemsProps} from '../../../common/types';
import {actionStateProps} from '../../types';

export const ADD_FORM_ITEMS = 'ADD_FORM_ITEMS';

type addFormItemsProps = formItemsProps[];

export const addFormItem = (formItems: addFormItemsProps) => ({
  type: ADD_FORM_ITEMS,
  formItems,
});

const initialState: {formItems: formItemsProps[]} = {
  formItems: [],
};

export default (state = initialState, action: actionStateProps) => {
  const {formItems} = action;
  switch (action.type) {
    case ADD_FORM_ITEMS:
      return {
        ...state,
        formItems,
      };
    default:
      return state;
  }
};
