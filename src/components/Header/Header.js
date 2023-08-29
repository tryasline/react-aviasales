import s from './Header.module.scss';
import logo from './Logo.svg';

function Header() {
  return (
    <div className={s.header}>
      <div>
        <img src={logo} alt="#" />
      </div>
    </div>
  );
}

export default Header;
