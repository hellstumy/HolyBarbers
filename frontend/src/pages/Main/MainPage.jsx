import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import reward from "../../assets/icons/reward.svg";
import time from "../../assets/icons/time.svg";
import star from "../../assets/icons/star.svg";
import people from "../../assets/icons/people.svg";
import person from "../../assets/icons/person.svg";
import magic from "../../assets/icons/magic.svg";
import siccers from "../../assets/icons/siccers.svg";
import testbarber from '../../assets/testbarber.png'
import "./mainpage.css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";



export default function MainPage() {
    return (
      <main>
        <section className="main-hero">
          <div className="hero-content">
            <p className="subtittle">HOLY BARBERS</p>
            <h1>
              Искусство <br />
              создавать
              <br /> стиль
            </h1>
            <p>
              Премиальный барбершоп, где традиции встречаются с современностью.
              Индивидуальный подход к каждому клиенту.
            </p>
            <div className="hero-buttons">
              <SecondaryButton>Записаться онлайн</SecondaryButton>
              <a href="tel:+48571371493" className="hero-tell">
                +48 (571) 371 493
              </a>
            </div>
          </div>
        </section>
        <section className="aboutUs">
          <div className="container">
            <div className="aboutUs-content">
              <p className="subtittle">О БАРБЕРШОПЕ</p>
              <h2>
                Премиум-класс <br />
                для настоящих ценителей
              </h2>
              <p>
                Holy Barbers — это место, где каждая деталь продумана для вашего
                комфорта. Мы создали пространство, объединяющее традиции
                классического барберинга и современные тенденции стиля.
              </p>
              <p>
                Наша команда состоит из профессионалов своего дела, которые
                постоянно совершенствуют свое мастерство и следят за мировыми
                трендами в индустрии барберинга.
              </p>
              <div className="aboutUs-info">
                <div className="aboutUs-info-item">
                  <h3>5+</h3>
                  <p>Лет опыта в индустрии</p>
                </div>
                <div className="aboutUs-info-line"></div>
                <div className="aboutUs-info-item">
                  <h3>1000+</h3>
                  <p>Довольных клиентов</p>
                </div>
              </div>
            </div>
            <div className="aboutus-cards">
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={reward} alt="" />
                </div>

                <h5>Мастерство</h5>
                <p>Опытные барберы с международными сертификатами</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={people} alt="" />
                </div>

                <h5>Индивидуальность</h5>
                <p>Персональный подход к каждому клиенту</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={time} alt="" />
                </div>

                <h5>Комфорт</h5>
                <p>Запись онлайн без очередей и ожидания</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={star} alt="" />
                </div>

                <h5>Качество</h5>
                <p>Только премиальная косметика и инструменты</p>
              </div>
            </div>
          </div>
        </section>
        <section className="OurServise">
          <div className="container">
            <p className="subtittle">УСЛУГИ</p>
            <h2>Наши услуги</h2>
            <p>
              Широкий спектр барберских услуг премиум-класса. Каждая процедура{" "}
              <br />
              выполняется с максимальным вниманием к деталям.
            </p>
            <div className="OurServise_cards">
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={siccers} alt="" />
                </div>
                <h5>Классическая стрижка</h5>
                <p>Профессиональная стрижка с учетом формы лица и типа волос</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>45 мин</p>
                  <p>3000 $</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={person} alt="" />
                </div>
                <h5>Моделирование бороды</h5>
                <p>Придание формы и ухоженного вида вашей бороде</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>30 мин</p>
                  <p>2000 $</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={star} alt="" />
                </div>
                <h5>Комплекс премиум</h5>
                <p>Стрижка + борода + уход за кожей лица</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>90 мин</p>
                  <p>5500 $</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={magic} alt="" />
                </div>
                <h5>Королевское бритье</h5>
                <p>Традиционное бритье опасной бритвой с горячим компрессом</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>40 мин</p>
                  <p>2500 $</p>
                </div>
              </div>
            </div>
            <SecondaryButton className="secondary-button">
              ЗАПИСАТЬСЯ НА УСЛУГУ
            </SecondaryButton>
          </div>
        </section>
        <section className="OurBarbers">
          <div className="container">
            <p className="subtittle">КОМАНДА</p>
            <h2>Наши мастера</h2>
            <p>
              Каждый из наших барберов — профессионал с многолетним опытом и{" "}
              <br />
              уникальным стилем работы.
            </p>
            <div className="OurBarbers_carusel">
              <Splide
                options={{
                  perPage: 3,
                  rewind: true,
                }}
                perPage="3"
                aria-label="Barbers"
              >
                <SplideSlide>
                  <img src={testbarber} alt="Image 1" />
                  <h4 className="Barber-name">Александр Петров</h4>
                  <p>Опыт работы: 5 месяцев</p>
                </SplideSlide>
                <SplideSlide>
                  <img src={testbarber} alt="Image 2" />
                  <h4 className="Barber-name">Дмитрий Соколов</h4>
                  <p>Опыт работы: 5 месяцев</p>
                </SplideSlide>
                <SplideSlide>
                  <img src={testbarber} alt="Image 1" />
                  <h4 className="Barber-name">Александр Петров</h4>
                  <p>Опыт работы: 5 месяцев</p>
                </SplideSlide>
                <SplideSlide>
                  <img src={testbarber} alt="Image 2" />
                  <h4 className="Barber-name">Дмитрий Соколов</h4>
                  <p>Опыт работы: 5 месяцев</p>
                </SplideSlide>
              </Splide>
            </div>
          </div>
        </section>
      </main>
    );
  }