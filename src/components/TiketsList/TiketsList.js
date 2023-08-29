import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { cheapTickets, fastTickets, optimalTickets, addTikets, isError } from '../redux/tikets-reducer';
import timeHoursAndMin, { addTime } from '../function/function-data';

import logo from './S7 Logo.svg';
import Prealoader from './Preloader/Preloader';
import ErrorMessage from './Preloader/ErrorMessage';
import s from './TiketsList.module.scss';

function TiketsList() {
  const dispatch = useDispatch();

  const allTikets = useSelector((state) => state.tickets.tickets);
  const isFetch = useSelector((state) => state.tickets.isFetch);
  const noFilter = useSelector((state) => state.tickets.noFilter);
  const isError = useSelector((state) => state.tickets.isError);

  const btn1 = useSelector((state) => state.filter.buttonFilter[0].active);
  const btn2 = useSelector((state) => state.filter.buttonFilter[1].active);
  const btn3 = useSelector((state) => state.filter.buttonFilter[2].active);

  const activeState1 = btn1 ? `${s.active}` : '';
  const activeState2 = btn2 ? `${s.active}` : '';
  const activeState3 = btn3 ? `${s.active}` : '';

  const buttonClick1 = () => {
    dispatch({ type: 'BUTTON_CLICK', payload: 1 });
    dispatch(cheapTickets());
  };
  const buttonClick2 = () => {
    dispatch({ type: 'BUTTON_CLICK', payload: 2 });
    dispatch(fastTickets());
  };
  const buttonClick3 = () => {
    dispatch({ type: 'BUTTON_CLICK', payload: 3 });
    dispatch(optimalTickets());
  };

  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((res) => {
        setSearchId(res.searchId);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (searchId && stop === false) {
      try {
        async function subcribe() {
          const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
          if (response.status === 502 || response.status === 500) {
            await subcribe();
          } else if (response.status === 404) {
          } else if (response.status !== 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await subcribe();
          } else {
            const ticketsPart = await response.json();
            setTickets([...tickets, ...ticketsPart.tickets]);
            dispatch(addTikets(tickets));
            if (ticketsPart.stop) {
              setStop(true);
            }
          }
        }
        subcribe();
      } catch (e) {
        console.log(e);
        dispatch(isError(true));
      }
    }
  }, [searchId, tickets, stop]);

  const tik = allTikets.map((u, i) => {
    if (i < 5) {
      return <Tiket u={u} id={Date.now()} />;
    }
  });

  const checking = isError ? (
    <ErrorMessage />
  ) : noFilter ? (
    <h1>Рейсов, подходящих под заданные фильтры, не найдено</h1>
  ) : isFetch ? (
    <Prealoader />
  ) : (
    tik
  );

  return (
    <div className={s.tiketsList}>
      <div className={s.filterCoast}>
        <button id={1} className={`${s.button} ${activeState1}`} type="button" onClick={buttonClick1}>
          Самый дешевый
        </button>
        <button id={2} className={`${s.button} ${activeState2}`} type="button" onClick={buttonClick2}>
          Самый быстрый
        </button>
        <button id={3} className={`${s.button} ${activeState3}`} type="button" onClick={buttonClick3}>
          Оптимальный
        </button>
      </div>
      <div className={s.tikets}>{checking}</div>
    </div>
  );
}

function Tiket({ u, id }) {
  return (
    <div className={s.tiket} key={id}>
      <div className={s.header}>
        <span className={s.coast}>{`${u.price} Р`}</span>
        {/* <span className={s.avialine}>S7</span> */}
        <img src={logo} alt={u.carrier} />
      </div>
      <div className={s.info}>
        <div className={s.direction}>
          <span className={s.over}>{`${u.segments[0].origin}-${u.segments[0].destination}`}</span>
          <span className={s.under}>{`${timeHoursAndMin(u.segments[0].date)} - ${addTime(
            u.segments[0].date,
            u.segments[0].duration
          )}`}</span>
        </div>
        <div className={s.timeFly}>
          <span className={s.over}>В пути</span>
          <span className={s.under}>{`${Math.floor(u.segments[0].duration / 60)}ч ${
            u.segments[0].duration % 60
          }м`}</span>
        </div>
        <div className={s.stopes}>
          <span className={s.over}>{`${u.segments[0].stops.length} пересадки`}</span>
          <span className={s.under}>{u.segments[0].stops.join(',')}</span>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.direction}>
          <span className={s.over}>{`${u.segments[1].origin}-${u.segments[1].destination}`}</span>
          <span className={s.under}>{`${timeHoursAndMin(u.segments[1].date)} - ${addTime(
            u.segments[1].date,
            u.segments[1].duration
          )}`}</span>
        </div>
        <div className={s.timeFly}>
          <span className={s.over}>В пути</span>
          <span className={s.under}>{`${Math.floor(u.segments[1].duration / 60)}ч ${
            u.segments[1].duration % 60
          }м`}</span>
        </div>
        <div className={s.stopes}>
          <span className={s.over}>{`${u.segments[1].stops.length} пересадки`}</span>
          <span className={s.under}>{u.segments[1].stops.join(',')}</span>
        </div>
      </div>
    </div>
  );
}

export default TiketsList;
