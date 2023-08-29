import s from './Preloader.module.scss';

function ErrorMessage() {
  return (
    <div className={s.errorContainer}>
      <h3>Произошла ошибка, перезагрузите страницу</h3>
    </div>
  );
}

export default ErrorMessage;
