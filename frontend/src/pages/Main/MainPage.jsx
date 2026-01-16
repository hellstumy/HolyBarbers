import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import reward from "../../assets/icons/reward.svg";
import time from "../../assets/icons/time.svg";
import star from "../../assets/icons/star.svg";
import people from "../../assets/icons/people.svg";
import person from "../../assets/icons/person.svg";
import magic from "../../assets/icons/magic.svg";
import siccers from "../../assets/icons/siccers.svg";
import "./mainpage.css";
import   {  barbersApi }  from "../../../api/barbers.api";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { useTranslation } from "react-i18next";


export default function MainPage() {
  const { t } = useTranslation();
  const {setAppointmentPage} = useStore();

  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    barbersApi.getAllBarbers().then(setBarbers).catch(console.error);
  }, []);

    return (
      <main>
        <section className="main-hero">
          <div className="container">
            <div className="hero-content">
              <p className="subtittle">HOLY BARBERS</p>
              <h1>{t("mainPage.hero.title")}</h1>
              <p>{t("mainPage.hero.description")}</p>
              <div className="hero-buttons">
                <SecondaryButton onClick={setAppointmentPage}>
                  {t("mainPage.hero.button")}
                </SecondaryButton>
                <a href="tel:+48571371493" className="hero-tell">
                  +48 (571) 371 493
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="aboutUs">
          <div className="container">
            <div className="aboutUs-content">
              <p className="subtittle">{t("mainPage.about.subtitle")}</p>
              <h2>{t("mainPage.about.title")}</h2>
              <p>{t("mainPage.about.description1")}</p>
              <p>{t("mainPage.about.description2")}</p>
              <div className="aboutUs-info">
                <div className="aboutUs-info-item">
                  <h3>5+</h3>
                  <p>{t("mainPage.about.stats.experience")}</p>
                </div>
                <div className="aboutUs-info-line"></div>
                <div className="aboutUs-info-item">
                  <h3>1000+</h3>
                  <p>{t("mainPage.about.stats.clients")}</p>
                </div>
              </div>
            </div>
            <div className="aboutus-cards">
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={reward} alt="" />
                </div>

                <h5>{t("mainPage.about.cards.skill.title")}</h5>
                <p>{t("mainPage.about.cards.skill.description")}</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={people} alt="" />
                </div>

                <h5>{t("mainPage.about.cards.individuality.title")}</h5>
                <p>{t("mainPage.about.cards.individuality.description")}</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={time} alt="" />
                </div>

                <h5>{t("mainPage.about.cards.comfort.title")}</h5>
                <p>{t("mainPage.about.cards.comfort.description")}</p>
              </div>
              <div className="aboutus-card">
                <div className="aboutUs-icon">
                  <img className="aboutUs-img" src={star} alt="" />
                </div>

                <h5>{t("mainPage.about.cards.quality.title")}</h5>
                <p>{t("mainPage.about.cards.quality.description")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="OurServise">
          <div className="container">
            <p className="subtittle">{t("mainPage.services.subtitle")}</p>
            <h2>{t("mainPage.services.title")}</h2>
            <p>{t("mainPage.services.description")}</p>
            <div className="OurServise_cards">
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={siccers} alt="" />
                </div>
                <h5>{t("mainPage.services.cards.haircut.title")}</h5>
                <p>{t("mainPage.services.cards.haircut.description")}</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>{t("mainPage.services.cards.haircut.time")}</p>
                  <p>{t("mainPage.services.cards.haircut.price")}</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={person} alt="" />
                </div>
                <h5>{t("mainPage.services.cards.beard.title")}</h5>
                <p>{t("mainPage.services.cards.beard.description")}</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>{t("mainPage.services.cards.beard.time")}</p>
                  <p>{t("mainPage.services.cards.beard.price")}</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={star} alt="" />
                </div>
                <h5>{t("mainPage.services.cards.combo.title")}</h5>
                <p>{t("mainPage.services.cards.combo.description")}</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>{t("mainPage.services.cards.combo.time")}</p>
                  <p>{t("mainPage.services.cards.combo.price")}</p>
                </div>
              </div>
              <div className="OurServise_card">
                <div className="OurServise_img_container">
                  <img src={magic} alt="" />
                </div>
                <h5>{t("mainPage.services.cards.father_son.title")}</h5>
                <p>{t("mainPage.services.cards.father_son.description")}</p>
                <span className="OurSerice_line"></span>
                <div className="OurServide_card_info">
                  <p>{t("mainPage.services.cards.father_son.time")}</p>
                  <p>{t("mainPage.services.cards.father_son.price")}</p>
                </div>
              </div>
            </div>
            <SecondaryButton
              onClick={setAppointmentPage}
              className="secondary-button"
            >
              {t("mainPage.services.button")}
            </SecondaryButton>
          </div>
        </section>
        <section className="OurBarbers">
          <p className="subtittle">{t("mainPage.team.subtitle")}</p>
          <h2>{t("mainPage.team.title")}</h2>
          <p>{t("mainPage.team.description")}</p>
          <div className="OurBarbers_carusel">
            <Splide
              options={{
                perPage: 3,
                gap: "24px",
                rewind: true,
                breakpoints: {
                  1024: {
                    perPage: 2,
                  },
                  645: {
                    perPage: 1,
                  },
                },
              }}
              aria-label="Barbers"
            >
              {barbers.map((b) => (
                <SplideSlide key={b.id || b.name}>
                  <div className="barber-card">
                    <img src={b.img_url} alt={b.name} />
                    <h4 className="Barber-name">{b.name}</h4>
                    <p></p>
                    <p>
                      {t("mainPage.team.experience_label")}{" "}
                      {`${b.experiance} mounths`}
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>
      </main>
    );
  }