import { useDispatch, useSelector } from 'react-redux';

import { withoutTrans, oneTransfer, twoTransfer, threeTransfer, noFilter, anyFilter } from '../redux/tikets-reducer';

import s from './SideBar.module.scss';

function SideBar() {
  const dispatch = useDispatch();
  const checkbox = useSelector((state) => state.checkbox.checkbox);

  const filterTickets = (id) => {
    if (id === 1) {
      dispatch({ type: 'ALL_TIKETS' });
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

  const allInput = () => {
    const mas = checkbox.filter((item) => item.checked);
    if (mas.length < 5) {
      dispatch({ type: 'ALL_INPUT_TRUE' });
      dispatch(anyFilter());
    } else if (mas.length === 5) {
      dispatch({ type: 'ALL_INPUT_FALSE' });
      dispatch(noFilter());
    }
  };

  const toggleInput = (id) => {
    filterTickets(id);
    if (id === 1) {
      allInput();
    }
    if (id !== 1) {
      const mas = [...checkbox.filter((item) => item.checked)];
      const arr = [...checkbox.filter((item) => id === item.id && item.checked)].length;
      if (mas.length === 3) {
        if (arr) {
          dispatch({ type: 'ONE_INPUT', payload: id });
        } else {
          dispatch({ type: 'ALL_INPUT_TRUE' });
        }
      } else {
        dispatch({ type: 'ONE_INPUT', payload: id });
        if (checkbox.filter((item) => item.checked).length === 4) {
          dispatch({ type: 'ALL_INPUT_TRUE' });
        }
      }
    }
  };

  const checkboxList = checkbox.map((item) => (
    <CheckBox
      id={item.id}
      labelText={item.labelText}
      key={item.id}
      checked={item.checked}
      toggleInput={() => toggleInput(item.id)}
    />
  ));

  return (
    <div className={s.sideBar}>
      <h4>Количество пересадок</h4>
      {checkboxList}
    </div>
  );
}
function CheckBox({ id, labelText, checked, toggleInput }) {
  return (
    <div className={s.checkContainer} key={id}>
      <input type="checkbox" id={id} className={s.input} checked={checked} onChange={() => toggleInput(id)} />
      <label htmlFor={id} className={s.input}>
        {labelText}
      </label>
    </div>
  );
}

export default SideBar;
