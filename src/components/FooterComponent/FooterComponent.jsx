import React from "react";
import "./style.scss";
import logo from "../../assets/pictures/logoshop1.png";
import facebookIcon from "../../assets/icons/icon-facebook.png";
import youtubeIcon from "../../assets/icons/icon-youtube.png";
import twitterIcon from "../../assets/icons/icon-twister.png";
import { useTranslation } from "react-i18next";

const FooterComponent = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div class="footer">
        <div>
          <a href="/" class="row-align-center mb-md-2">
            <img
              class="logo"
              src={logo}
              alt="goTech-logo"
              height={18}
              width={18}
            />
            <h5 class="name">Go Tech</h5>
          </a>
          <p class="copyright d-md-block d-none">Copyright @ 2024</p>
        </div>

        <div class="policy">
          <a href="/term-of-services" target="_blank" class="link">
            {t("Term of services")}
          </a>
          <a href="/privacy-policy" target="_blank" class="link">
            {t("Privacy Policy")}
          </a>
          <a href="/refund-policy" target="_blank" class="link">
            {" "}
            {t("Refund Policy")}{" "}
          </a>
        </div>
        <div class="support">
          <div class="supportItem">
            <a href="https://www.youtube.com" target="_blank">
              <img src={youtubeIcon} alt="youtube" />
            </a>
          </div>
          <div class="supportItem">
            <a href="https://www.facebook.com" target="_blank">
              <img src={facebookIcon} alt="facebook" />
            </a>
          </div>
          <div class="supportItem">
            <a href="https://twitter.com" target="_blank">
              <img src={twitterIcon} alt="twister" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
