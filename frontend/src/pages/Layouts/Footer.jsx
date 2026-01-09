import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import phone from '../../assets/icons/phone.svg';
import address from '../../assets/icons/address.svg';
import mail from '../../assets/icons/mail.svg';
export default function Footer(){
    return (
      <footer>
        <div className="footer-content">
          <div className="footer-main">
            <h3>Holy Barbers</h3>
            <p>
              Премиальный барбершоп для настоящих ценителей стиля и качества.
              Создаем не просто стрижки, а образы.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/holybarbers_katowice/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                href="https://www.facebook.com/Holy.Barbers.team"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Контакты</h3>
            <div className="footer-contact-item">
              <img src={phone} alt="Phone" />
              <a href="tel:+48571371493">+48 (571) 371 493</a>
            </div>
            <div className="footer-contact-item">
              <img src={address} alt="Address" />
              <a
                href="https://maps.app.goo.gl/VUJn3gyC4JybQ7tg7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiosny Ludów 11, 40-374 Katowice
              </a>
            </div>
            <div className="footer-contact-item">
              <img src={mail} alt="Mail" />
              <a href="https://booksy.com/pl-pl/20311_holy-barbers-tysiaclecia_barber-shop_11597_katowice#ba_s=seo">
                Booksly
              </a>
            </div>
          </div>
          <div className="footer-worktime">
            <h3>Время работы</h3>
            <div className="footer-worktime-item">
              <p>Понедельник - Пятница: 9:00 - 19:00</p>
            </div>
            <div className="footer-worktime-item">
              <p>Суббота: 9:00 - 17:00</p>
            </div>
            <div className="footer-worktime-item">
              <p>Воскресенье: Выходной</p>
            </div>
          </div>
        </div>
        <p className="footer-copyright">
          <span>©</span> 2026 Holy Barbers. All rights reserved.
        </p>
      </footer>
    );
}