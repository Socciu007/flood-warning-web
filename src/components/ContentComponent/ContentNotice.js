import { renderString } from "../../utils";
export const contentNotice = (item) => {
  return `Environmental Data:
      ${renderString(
    item.numberWarning.isDO,
    "DO",
    `${item.DO}mg/l`,
    "Low DO levels can reduce the ability of aquatic species to survive."
  )}
      ${renderString(
    item.numberWarning.isTemperature,
    "Temperature",
    `${item.temperature}°C`,
    "Impact on growth, health, reproductive ability of aquatic species, as well as their living environment."
  )}
      ${renderString(
    item.numberWarning.isPH,
    "pH",
    item.pH,
    "Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients."
  )}
      ${renderString(
    item.numberWarning.isTemperatureRight,
    "Temperature",
    `${item.temperatureRight}°C`,
    "This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products."
  )}
      ${renderString(
    item.numberWarning.isAmmonia,
    "Ammonia(NH₃)",
    `${item.ammonia}mg/l`,
    "Ammonia levels reduce the quality of aquatic and plant habitats."
  )}
      ${renderString(
    item.numberWarning.isBOD5,
    "BOD₅",
    `${item.BOD5}mg/l`,
    "BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life."
  )}
      ${renderString(
    item.numberWarning.isCOD,
    "COD",
    `${item.COD}mg/l`,
    "COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life."
  )}
      ${renderString(
    item.numberWarning.isColiform,
    "Coliform",
    `${item.coliform}CFU/100ml`,
    "There is organic pollution in the aquatic environment."
  )}
      ${renderString(
    item.numberWarning.isClarity,
    "Clarity",
    `${item.clarity}cm`,
    "Signs of pollution, organic waste or bacteria in water, posing a risk of disease outbreak."
  )}
      ${renderString(
    item.numberWarning.isPhosphat,
    "Phosphat",
    `${item.phosphat}mg/l`,
    "Pets showing signs of Phosphate toxicity and stress."
  )}
      ${renderString(
    item.numberWarning.isSalinity,
    "Salinity",
    `${item.salinity}‰`,
    "Low salinity aquatic environments can affect the ability of aquatic species to sustain life."
  )}
      ${renderString(
    item.numberWarning.isAlkalinity,
    "Alkalinity",
    `${item.alkalinity}mg/l`,
    "Risk of water acidification."
  )}
      ${renderString(
    item.numberWarning.isSuspendedSolids,
    "Suspended Solids",
    `${item.suspendedSolids}mg/l`,
    "TSS levels can reduce water filtration and degrade water quality in aquatic habitats."
  )}
      ${renderString(
    item.numberWarning.isTotalCrom,
    "Total Crom",
    `${item.totalCrom}mg/l`,
    "There is chromium contamination."
  )}
      ${renderString(
    item.numberWarning.isH2S,
    "H₂S",
    `${item.H2S}mg/l`,
    "This level of H₂S can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isCN,
    "CN",
    `${item.CN}mg/l`,
    "This level of CN can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isAs,
    "As",
    `${item.As}mg/l`,
    "This level of As can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isCd,
    "Cd",
    `${item.Cd}mg/l`,
    "This level of Cd can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isPb,
    "Pb",
    `${item.Pb}mg/l`,
    "This level of Pb can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isCu,
    "Cu",
    `${item.Cu}mg/l`,
    "This level of Cu can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isHg,
    "Hg",
    `${item.Hg}mg/l`,
    "This level of Hg can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isMn,
    "Mn",
    `${item.Mn}mg/l`,
    "This level of Mn can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isFe,
    "Fe",
    `${item.Fe}mg/l`,
    "This level of Fe can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isZn,
    "Zn",
    `${item.Zn}mg/l`,
    "This level of Zn can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isCr6,
    "Cr6+",
    `${item.Cr6}mg/l`,
    "This level of Cr6+ can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isF,
    "F-",
    `${item.F}mg/l`,
    "This level of F- can lead to oxygen deficiency in the environment."
  )}
      ${renderString(
    item.numberWarning.isTotalPH,
    "Total petroleum hydrocarbons",
    `${item.totalPH}`,
    "Total petroleum hydrocarbons levels can affect the ability of aquatic species to sustain life."
  )}
      ${renderString(
    item.numberWarning.isRainfall,
    "Rainfall",
    `${item.rainfall}mm`,
    "This rainfall can reduce the vitality of species."
  )}`;
};
