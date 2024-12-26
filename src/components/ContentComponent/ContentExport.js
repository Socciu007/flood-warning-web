const ContentExport = (dataDetail) => {
  return `Alert detail of ${dataDetail?.name} (${dataDetail?.numberWarning?.level}/${Object.keys(dataDetail?.numberWarning).length - 1})
${dataDetail?.numberWarning?.isDO === 1 && `DO: ${dataDetail.DO}mg/l Low DO levels can reduce the ability of aquatic species to survive.`}
${dataDetail.numberWarning?.isTemperature === 1 && `Temperature: ${dataDetail.temperature}°C Impact on growth, health, reproductive ability of aquatic species, as well as their living environment.`}
${dataDetail?.numberWarning?.ispH === 1 && `pH: ${dataDetail.pH} Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients.`}
${dataDetail?.numberWarning?.isTemperatureRight === 1 && `${dataDetail?.typeArea === "Oyster farming" ? "Suitable temperature" : "Air temperature"}: ${dataDetail?.temperatureRight}°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
${dataDetail?.numberWarning?.isAlkalinity === 1 && `Alkalinity: ${dataDetail?.alkalinity}mg/l Risk of water acidification.`}
${dataDetail?.numberWarning?.isAmmonia === 1 && `Ammonia: ${dataDetail?.ammonia}mg/l Ammonia levels reduce the quality of aquatic and plant habitats.`}
${dataDetail?.numberWarning?.isBOD5 === 1 && `BOD5: ${dataDetail?.BOD5}mg/l BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
${dataDetail?.numberWarning?.isCOD === 1 && `COD: ${dataDetail?.COD}mg/l COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
${dataDetail?.numberWarning?.isClarity === 1 && `Clarity: ${dataDetail?.clarity}mg/l Sign of pollution, organic waste or bacteria in water, posing a risk of disease outbreak.`}
${dataDetail?.numberWarning?.isColiform === 1 && `Coliform: ${dataDetail?.coliform}CFU/100ml There is organic pollution in the aquatic environment.`}
${dataDetail?.numberWarning?.isSalinity === 1 && `Salinity: ${dataDetail?.salinity}‰ Low salinity aquatic environments can affect the ability of aquatic species to sustain life. `}
${dataDetail?.numberWarning?.isPhotsPhat === 1 && `Photsphat: ${dataDetail?.phosPhat}mg/l Pets showing signs of Phosphate toxicity and stress.`}
${dataDetail?.numberWarning?.isSuspendedSolids === 1 && `TSS: ${dataDetail?.suspendedSolids}mg/l TSS levels can reduce water filtration and degrade water quality in aquatic habitats.`}
${dataDetail?.numberWarning?.isTotalCrom === 1 && `Total Crom: ${dataDetail?.totalCrom}mg/l There is chromium contamination.`}
${dataDetail?.numberWarning?.isH2S === 1 && `H₂S: ${dataDetail?.H2S}mg/l This level of H₂S can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isCN === 1 && `CN: ${dataDetail?.CN} This level of CN can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isAs === 1 && `As: ${dataDetail?.As}mg/l This level of As can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isCd === 1 && `Cd: ${dataDetail?.Cd}mg/l This level of Cd can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isPb === 1 && `Pb: ${dataDetail?.Pb}mg/l This level of Pb can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isCu === 1 && `Cu: ${dataDetail?.Cu}mg/l This level of Cu can lead to oxygen eficiency in the environment.`}
${dataDetail?.numberWarning?.isZn === 1 && `Zn: ${dataDetail?.Zn}mg/l This level of Zn can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isHg === 1 && `Hg: ${dataDetail?.Hg}mg/l This level of Hg can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isMn === 1 && `Mn: ${dataDetail?.Mn}mg/l This level of Mn can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isFe === 1 && `Fe: ${dataDetail?.Fe}mg/l This level of Fe can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isCr6 === 1 && `Cr6+: ${dataDetail?.Cr6}mg/l This level of Cr6+ can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isF === 1 && `F-: ${dataDetail?.F}mg/l This level of F- can lead to oxygen deficiency in the environment.`}
${dataDetail?.numberWarning?.isTotalPH === 1 && `Total petroleum hydrocarbons: ${dataDetail?.totalPH} This level of Total petroleum hydrocarbons can lead to oxygen deficiency in the environment.`}
`;
};

export default ContentExport;