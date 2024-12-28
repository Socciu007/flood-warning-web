import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ContentDetailAlert = ({
  dataDetailWarning,
  countWarning,
  handleOpenDetailWarning,
}) => {
  console.log(dataDetailWarning);
  const { t } = useTranslation();
  return (
    <div className="content-detail-warning">
      <div className="content-detail-warning-title">
        <h3>
          {t("Detail of alert")} (
          {`${dataDetailWarning?.numberWarning}/${countWarning}`})
        </h3>
        <CloseOutlined onClick={handleOpenDetailWarning} />
      </div>
      <div className="content-detail-warning-content">
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isDO === 1 &&
            `• DO: ${dataDetailWarning?.detailWarning?.DO}mg/l Low DO levels can reduce the ability of aquatic species to survive.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isTemperature ===
            1 &&
            `• Temperature: ${dataDetailWarning?.detailWarning?.temperature}°C Impact on growth, health, reproductive ability of aquatic species, as well as their living environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.ispH === 1 &&
            `• pH: ${dataDetailWarning?.detailWarning?.pH} Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning
            ?.isTemperatureRight === 1 &&
            `• ${
              dataDetailWarning?.typeArea === "Oyster farming"
                ? "Suitable temperature"
                : "Air temperature"
            } : ${
              dataDetailWarning?.detailWarning?.temperatureRight
            }°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isAlkalinity ===
            1 &&
            `• Alkalinity: ${dataDetailWarning?.detailWarning?.alkalinity}mg/l Risk of water acidification.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isAmmonia === 1 &&
            `• Ammonia: ${dataDetailWarning?.detailWarning?.ammonia}mg/l Ammonia levels reduce the quality of aquatic and plant habitats.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isBOD5 === 1 &&
            `• BOD5: ${dataDetailWarning?.detailWarning?.BOD5}mg/l BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isCOD === 1 &&
            `• COD: ${dataDetailWarning?.detailWarning?.COD}mg/l COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isClarity === 1 &&
            `• Clarity: ${dataDetailWarning?.detailWarning?.clarity}mg/l Sign of pollution, organic waste or bacteria in water, posing a risk of disease outbreak.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isColiform === 1 &&
            `• Coliform: ${dataDetailWarning?.detailWarning?.coliform}CFU/100ml There is organic pollution in the aquatic environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isSalinity === 1 &&
            `• Salinity: ${dataDetailWarning?.detailWarning?.salinity}‰ Low salinity aquatic environments can affect the ability of aquatic species to sustain life. `}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isPhotsPhat === 1 &&
            `• Photsphat: ${dataDetailWarning?.detailWarning?.phosPhat}mg/l Pets showing signs of Phosphate toxicity and stress.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning
            ?.isSuspendedSolids === 1 &&
            `• TSS: ${dataDetailWarning?.detailWarning?.suspendedSolids}mg/l TSS levels can reduce water filtration and degrade water quality in aquatic habitats.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isTotalCrom === 1 &&
            `• Total Crom: ${dataDetailWarning?.detailWarning?.totalCrom}mg/l There is chromium contamination.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isH2S === 1 &&
            `• H₂S: ${dataDetailWarning?.detailWarning?.H2S}mg/l This level of H₂S can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isCN === 1 &&
            `• CN: ${dataDetailWarning?.detailWarning?.CN} This level of CN can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isAs === 1 &&
            `• As: ${dataDetailWarning?.detailWarning?.As}mg/l This level of As can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isCd === 1 &&
            `• Cd: ${dataDetailWarning?.detailWarning?.Cd}mg/l This level of Cd can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isPb === 1 &&
            `• Pb: ${dataDetailWarning?.detailWarning?.Pb}mg/l This level of Pb can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isCu === 1 &&
            `• Cu: ${dataDetailWarning?.detailWarning?.Cu}mg/l This level of Cu can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isZn === 1 &&
            `• Zn: ${dataDetailWarning?.detailWarning?.Zn}mg/l This level of Zn can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isHg === 1 &&
            `• Hg: ${dataDetailWarning?.detailWarning?.Hg}mg/l This level of Hg can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isMn === 1 &&
            `• Mn: ${dataDetailWarning?.detailWarning?.Mn}mg/l This level of Mn can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isFe === 1 &&
            `• Fe: ${dataDetailWarning?.detailWarning?.Fe}mg/l This level of Fe can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isCr6 === 1 &&
            `• Cr6+: ${dataDetailWarning?.detailWarning?.Cr6}mg/l This level of Cr6+ can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isF === 1 &&
            `• F-: ${dataDetailWarning?.detailWarning?.F}mg/l This level of F- can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isTotalPH === 1 &&
            `• Total petroleum hydrocarbons: ${dataDetailWarning?.detailWarning?.totalPH} This level of Total petroleum hydrocarbons can lead to oxygen deficiency in the environment.`}
        </p>
        <p>
          {dataDetailWarning?.detailWarning?.numberWarning?.isRainfall === 1 &&
            `• Rainfall: ${dataDetailWarning?.detailWarning?.rainfall}mm/year This level of rainfall can lead to oxygen deficiency in the environment.`}
        </p>
      </div>
    </div>
  );
};

export default ContentDetailAlert;
