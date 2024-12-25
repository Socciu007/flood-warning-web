import React from "react";

const ContentDetailDataImport = ({ dataDetail }) => {
  return (
    <div className="content-detail-data-content">
      {(dataDetail?.DO || dataDetail?.DO === 0) && (
        <span>DO: {dataDetail?.DO}(mg/l)</span>
      )}
      {(dataDetail?.temperature || dataDetail?.temperature === 0) && (
        <span>Temperature: {dataDetail?.temperature}(°C)</span>
      )}
      {(dataDetail?.pH || dataDetail?.pH === 0) && (
        <span>pH: {dataDetail?.pH}(mg/l)</span>
      )}
      {(dataDetail?.temperatureRight || dataDetail?.temperatureRight === 0) && (
        <span>
          {dataDetail?.name?.toLowerCase()?.includes("Rừng".toLowerCase()) ===
          "Oyster farming"
            ? "Air temperature"
            : "Suitable temperature"}{" "}
          : {dataDetail?.temperatureRight}(°C)
        </span>
      )}
      {(dataDetail?.alkalinity || dataDetail?.alkalinity === 0) && (
        <span>Alkalinity: {dataDetail?.alkalinity}(mg/l)</span>
      )}
      {(dataDetail?.ammonia || dataDetail?.ammonia === 0) && (
        <span>Ammonia: {dataDetail?.ammonia}(mg/l)</span>
      )}
      {(dataDetail?.BOD5 || dataDetail?.BOD5 === 0) && (
        <span>BOD5: {dataDetail?.BOD5}(mg/l)</span>
      )}
      {(dataDetail?.COD || dataDetail?.COD === 0) && (
        <span>COD: {dataDetail?.COD}(mg/l)</span>
      )}
      {(dataDetail?.clarity || dataDetail?.clarity === 0) && (
        <span>Clarity: {dataDetail?.clarity}(mg/l)</span>
      )}
      {(dataDetail?.coliform || dataDetail?.coliform === 0) && (
        <span>Coliform: {dataDetail?.coliform}(CFU/100ml)</span>
      )}
      {(dataDetail?.salinity || dataDetail?.salinity === 0) && (
        <span>Salinity: {dataDetail?.salinity}(‰)</span>
      )}
      {(dataDetail?.photsPhat || dataDetail?.photsPhat === 0) && (
        <span>PhotsPhat: {dataDetail?.photsPhat}(mg/l)</span>
      )}
      {(dataDetail?.suspendedSolids || dataDetail?.suspendedSolids === 0) && (
        <span>TSS: {dataDetail?.suspendedSolids}(mg/l)</span>
      )}
      {(dataDetail?.totalCrom || dataDetail?.totalCrom === 0) && (
        <span>TotalCrom: {dataDetail?.totalCrom}(mg/l)</span>
      )}
      {(dataDetail?.H2S || dataDetail?.H2S === 0) && (
        <span>H2S: {dataDetail?.H2S}(mg/l)</span>
      )}
      {(dataDetail?.CN || dataDetail?.CN === 0) && (
        <span>CN: {dataDetail?.CN}(mg/l)</span>
      )}
      {(dataDetail?.As || dataDetail?.As === 0) && (
        <span>As: {dataDetail?.As}(mg/l)</span>
      )}
      {(dataDetail?.Cd || dataDetail?.Cd === 0) && (
        <span>Cd: {dataDetail?.Cd}(mg/l)</span>
      )}
      {(dataDetail?.Pb || dataDetail?.Pb === 0) && (
        <span>Pb: {dataDetail?.Pb}(mg/l)</span>
      )}
      {(dataDetail?.Cu || dataDetail?.Cu === 0) && (
        <span>Cu: {dataDetail?.Cu}(mg/l)</span>
      )}
      {(dataDetail?.Zn || dataDetail?.Zn === 0) && (
        <span>Zn: {dataDetail?.Zn}(mg/l)</span>
      )}
      {(dataDetail?.Hg || dataDetail?.Hg === 0) && (
        <span>Hg: {dataDetail?.Hg}(mg/l)</span>
      )}
      {(dataDetail?.Mn || dataDetail?.Mn === 0) && (
        <span>Mn: {dataDetail?.Mn}(mg/l)</span>
      )}
      {(dataDetail?.Fe || dataDetail?.Fe === 0) && (
        <span>Fe: {dataDetail?.Fe}(mg/l)</span>
      )}
      {(dataDetail?.Cr6 || dataDetail?.Cr6 === 0) && (
        <span>Cr6+: {dataDetail?.Cr6}(mg/l)</span>
      )}
      {(dataDetail?.F || dataDetail?.F === 0) && (
        <span>F-: {dataDetail?.F}(mg/l)</span>
      )}
      {(dataDetail?.totalPH || dataDetail?.totalPH === 0) && (
        <span>Total petroleum hydrocarbons: {dataDetail?.totalPH}(mg/l)</span>
      )}
      {(dataDetail?.rainfall || dataDetail?.rainfall === 0) && (
        <span>Rainfall: {dataDetail?.rainfall}(mm/year)</span>
      )}
    </div>
  );
};

export default ContentDetailDataImport;
