import React, { useState, useEffect } from "react";
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormDependency,
  ProFormDigitRange,
} from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { getStandardData } from "../../services/serviceExam";
import { useQuery } from "@tanstack/react-query";

const FormFillStandardData = ({ onFinish }) => {
  const { t } = useTranslation();
  const [standardData, setStandardData] = useState({});
  const [typeArea, setTypeArea] = useState("");

  // Query standard data
  const { data: dataDb } = useQuery({
    queryKey: ["dataDb"],
    queryFn: () => getStandardData(),
  });

  // Set standard data list
  useEffect(() => {
    if (dataDb) {
      const standardArrData = dataDb.find((item) => item.type === typeArea);
      setStandardData(standardArrData);
    }
  }, [dataDb, typeArea]);

  // Set standard data
  const handleChangeTypeArea = async (value) => {
    setTypeArea(value);
  };

  const optionsFarm = [
    {
      value: "Oyster farming",
      label: "Oyster farming",
    },
    {
      value: "Cobia farming",
      label: "Cobia farming",
    },
    {
      value: "Mangrove forest",
      label: "Mangrove forest",
    },
  ];
  return (
    <ProForm
      layout="horizontal"
      className="proform-standard-data"
      initialValues={
        {
          // DO: standardData?.DO ? standardData?.DO[0] : null,
          // temperatureRight: standardData?.temperatureRight ? standardData?.temperatureRight[0] : null,
          // rainfall: standardData?.rainfall ? standardData?.rainfall[0] : null,
          // pH: standardData?.pH ? standardData?.pH[0] : null,
          // salinity: standardData?.salinity ? standardData?.salinity[0] : null,
          // alkalinity: standardData?.alkalinity ? standardData?.alkalinity[0] : null,
          // clarity: standardData?.clarity ? standardData?.clarity[0] : null,
          // ammonia: standardData?.ammonia ? standardData?.ammonia[0] : null,
          // H2S: standardData?.H2S ? standardData?.H2S[0] : null,
          // temperature: standardData?.temperature ? standardData?.temperature[0] : null,
          // photsPhat: standardData?.photsPhat ? standardData?.photsPhat[0] : null,
          // BOD5: standardData?.BOD5 ? standardData?.BOD5[0] : null,
          // COD: standardData?.COD ? standardData?.COD[0] : null,
          // coliform: standardData?.coliform ? standardData?.coliform[0] : null,
          // suspendedSolids: standardData?.suspendedSolids ? standardData?.suspendedSolids[0] : null,
          // CN: standardData?.CN ? standardData?.CN[0] : null,
          // As: standardData?.As ? standardData?.As[0] : null,
          // Cd: standardData?.Cd ? standardData?.Cd[0] : null,
          // Pb: standardData?.Pb ? standardData?.Pb[0] : null,
          // Cu: standardData?.Cu ? standardData?.Cu[0] : null,
          // Hg: standardData?.Hg ? standardData?.Hg[0] : null,
          // Zn: standardData?.Zn ? standardData?.Zn[0] : null,
          // F: standardData?.F ? standardData?.F[0] : null,
          // Cr6: standardData?.Cr6 ? standardData?.Cr6[0] : null,
          // Mn: standardData?.Mn ? standardData?.Mn[0] : null,
          // Fe: standardData?.Fe ? standardData?.Fe[0] : null,
          // totalCrom: standardData?.totalCrom ? standardData?.totalCrom[0] : null,
          // totalPH: standardData?.totalPH ? standardData?.totalPH[0] : null,
        }
      }
      submitter={{
        searchConfig: {
          submitText: t("Save"),
          resetText: t("Reset"),
        },
        submitButtonProps: {
          style: { display: standardData ? "inline-block" : "none" },
        },
        resetButtonProps: {
          style: { display: standardData ? "inline-block" : "none" },
        },
      }}
      onFinish={onFinish}
    >
      <ProFormSelect
        options={optionsFarm}
        width="md"
        name="typeArea"
        label={t("Select the adjustment breeding area:")}
        placeholder={t("Select type")}
        onChange={handleChangeTypeArea}
      />
      <ProFormDependency name={["typeArea"]}>
        {({ typeArea }) => {
          return (
            <ProForm.Group>
              {(typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="DO"
                  label="DO(mg/l)"
                  placeholder={false}
                  defaultValue={standardData?.DO[0] ? standardData?.DO[0] : 0}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigitRange
                  label={
                    typeArea === "Mangrove forest"
                      ? "Air temperature(°C)"
                      : "Suitable temperature(°C)"
                  }
                  name="temperatureRight"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Mangrove forest" && (
                <ProFormDigitRange
                  width="xs"
                  name="rainfall"
                  label="Rainfall(mm/year)"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigitRange
                  width="xs"
                  name="pH"
                  label="pH"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigitRange
                  width="xs"
                  name="salinity"
                  label="Salinity(‰)"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigitRange
                  width="xs"
                  name="alkalinity"
                  label="Alkalinity(mg/l)"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigitRange
                  width="xs"
                  name="clarity"
                  label="Clarity(cm)"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="ammonia"
                  label="NH₃(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="H2S"
                  label="H₂S(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigitRange
                  width="xs"
                  name="temperature"
                  label="Temperature(°C)"
                  separator="-"
                  separatorWidth={5}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="photsPhat"
                  label="Photsphat(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="BOD5"
                  label="BOD₅(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="COD"
                  label="COD(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigit
                  width="xs"
                  name="coliform"
                  label="Coliform(MPN/100ml)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="suspendedSolids"
                  label="TSS(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Cobia farming" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="CN"
                  label="CN-(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="As"
                  label="As(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Cd"
                  label="Cd(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Pb"
                  label="Pb(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Cu"
                  label="Cu(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigit
                  width="xs"
                  name="Hg"
                  label="Hg(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Zn"
                  label="Zn(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="F"
                  label="F-(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Cr6"
                  label="Cr6+(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Mn"
                  label="Mn(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Fe"
                  label="Fe(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {(typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="totalCrom"
                  label="Total Crom(mg/l)"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="totalPH"
                  label="Total mineral oil and grease"
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                  }}
                />
              )}
            </ProForm.Group>
          );
        }}
      </ProFormDependency>
    </ProForm>
  );
};

export default FormFillStandardData;
