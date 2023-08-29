const defaultState = {
  checkbox: [
    { id: 1, labelText: 'Все', checked: true },
    { id: 2, labelText: 'Без пересадок', checked: true },
    { id: 3, labelText: '1 пересадка', checked: true },
    { id: 4, labelText: '2 пересадки', checked: true },
    { id: 5, labelText: '3 пересадки', checked: true },
  ],
  checkboxALL: [
    { id: 1, labelText: 'Все', checked: true },
    { id: 2, labelText: 'Без пересадок', checked: true },
    { id: 3, labelText: '1 пересадка', checked: true },
    { id: 4, labelText: '2 пересадки', checked: true },
    { id: 5, labelText: '3 пересадки', checked: true },
  ],
};

const ALL_INPUT_TRUE = 'ALL_INPUT_TRUE';
const ALL_INPUT_FALSE = 'ALL_INPUT_FALSE';
const ONE_INPUT = 'ONE_INPUT';

const checkboxReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ALL_INPUT_TRUE:
      return {
        ...state,
        checkbox: [...state.checkboxALL],
      };
    case ALL_INPUT_FALSE:
      return {
        ...state,
        checkbox: [...state.checkbox.map((item) => ({ ...item, checked: !item.checked }))],
      };
    case ONE_INPUT:
      return {
        ...state,
        checkbox: [
          ...state.checkbox.map((item, index) => {
            if (index === 0) {
              return { ...item, checked: false };
            }
            if (action.payload === item.id) {
              return { ...item, checked: !item.checked };
            }
            return { ...item };
          }),
        ],
      };
    default:
      return state;
  }
};

export default checkboxReducer;
