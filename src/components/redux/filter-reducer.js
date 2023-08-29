const defaultState = {
  buttonFilter: [
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ],
};

const BUTTON_CLICK = 'BUTTON_CLICK';

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case BUTTON_CLICK:
      return {
        ...state,
        buttonFilter: [
          ...state.buttonFilter.map((item) => {
            if (item.id === action.payload) {
              return { ...item, active: !item.active };
            }
            return { ...item, active: false };
          }),
        ],
      };
    default:
      return state;
  }
};

export default filterReducer;
