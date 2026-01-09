import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import reward from "../../assets/icons/reward.svg";
import time from "../../assets/icons/time.svg";
import star from "../../assets/icons/star.svg";
import people from "../../assets/icons/people.svg";
import "./mainpage.css";
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
                Holy Barbers — это место, где каждая деталь продумана для
                вашего комфорта. Мы создали пространство, объединяющее традиции
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
      </main>
    );
  }