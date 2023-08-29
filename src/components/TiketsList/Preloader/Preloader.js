import s from './Preloader.module.scss';

function Prealoader() {
  return (
    <div>
      <span className={s.loader} />
      <h3>Мы прокладываем ваш маршрут, ожидайте</h3>
    </div>
  );
}

export default Prealoader;
