import API from '../APITikets/TiketsAPI';

const defaultState = {
  tickets: [],
  allTickets: [],
  isFetch: true,
  noFilter: false,
  isError: false,
};

const ADD_TIKETS = 'ADD_TIKETS';
const CHEAP_TIKETS = 'CHEAP_TIKETS';
const FAST_TIKETS = 'FAST_TIKETS';
const OPTIMAL_TIKETS = 'OPTIMAL_TIKETS';
const ALL_TIKETS = 'ALL_TIKETS';
const WITHOUT_TRANSFER = 'WITHOUT_TRANSFER';
const ONE_TRANSFER = 'ONE_TRANSFER';
const TWO_TRANSFER = 'TWO_TRANSFER';
const THREE_TRANSFER = 'THREE_TRANSFER';
const NO_FILTER = 'NO_FILTER';
const ANY_FILTER = 'ANY_FILTER';
const IS_ERROR = 'IS_ERROR';

const tiketsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TIKETS:
      return {
        ...state,
        allTickets: action.tickets,
        isFetch: false,
        isError: false,
        tickets: [...state.tickets, ...action.tickets],
      };
    case CHEAP_TIKETS:
      return {
        ...state,
        tickets: [...state.tickets.sort((a, b) => a.price - b.price)],
      };
    case FAST_TIKETS:
      return {
        ...state,
        tickets: [...state.tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration)],
      };
    case OPTIMAL_TIKETS:
      return {
        ...state,
        tickets: [...state.allTickets],
      };
    case ALL_TIKETS:
      return {
        ...state,
        tickets: [...state.allTickets],
      };
    case WITHOUT_TRANSFER:
      return {
        ...state,
        tickets: [
          ...state.allTickets.filter(
            (item) => item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0
          ),
        ],
      };
    case ONE_TRANSFER:
      return {
        ...state,
        tickets: [
          ...state.allTickets.filter(
            (item) => item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1
          ),
        ],
      };
    case TWO_TRANSFER:
      return {
        ...state,
        tickets: [
          ...state.allTickets.filter(
            (item) => item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2
          ),
        ],
      };
    case THREE_TRANSFER:
      return {
        ...state,
        tickets: [
          ...state.allTickets.filter(
            (item) => item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3
          ),
        ],
      };
    case NO_FILTER:
      return {
        ...state,
        noFilter: true,
      };
    case ANY_FILTER:
      return {
        ...state,
        noFilter: false,
      };
    case IS_ERROR:
      return {
        ...state,
        isError: action.bool,
      };
    default:
      return state;
  }
};

export const addTikets = (tickets) => ({ type: ADD_TIKETS, tickets });
export const isError = (bool) => ({ type: IS_ERROR, bool });

// export function addTiketsThunk(userId) {
//   return async (dispatch) => {
//     const fetchTikets = async () => {
//       try {
//         const response = fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${userId}`);

//         if (!response.ok) {
//           throw new Error(`Ошибка HTTP! Статус:${response.status}`);
//         }
//         const jsonTickets = await response.json();
//         if (jsonTickets.stop) {
//           return false;
//         }
//         dispatch(addTikets(jsonTickets.tickets));
//         return true;
//       } catch (e) {
//         if (!e.message.includes('500')) {
//           return false;
//         }
//         return true;
//       }
//     };
//     let shouldContinue = true;
//     while (shouldContinue) {
//       shouldContinue = await fetchTikets();
//     }
//   };
// }

export const cheapTickets = () => ({ type: CHEAP_TIKETS });
export const fastTickets = () => ({ type: FAST_TIKETS });
export const optimalTickets = () => ({ type: OPTIMAL_TIKETS });
export const withoutTrans = () => ({ type: WITHOUT_TRANSFER });
export const oneTransfer = () => ({ type: ONE_TRANSFER });
export const twoTransfer = () => ({ type: TWO_TRANSFER });
export const threeTransfer = () => ({ type: THREE_TRANSFER });

export const noFilter = () => ({ type: NO_FILTER });

export const anyFilter = () => ({ type: ANY_FILTER });
export const filterTickets = (id, dispatch) => {
  if (id === 1) {
    dispatch({ type: ALL_TIKETS });
  }
  if (id === 2) {
    dispatch(withoutTrans());
  }
  if (id === 3) {
    dispatch(oneTransfer());
  }
  if (id === 4) {
    dispatch(twoTransfer());
  }
  if (id === 5) {
    dispatch(threeTransfer());
  }
};

export default tiketsReducer;
