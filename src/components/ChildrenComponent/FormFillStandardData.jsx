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
      const standardData = dataDb.find((item) => item.type === typeArea);
      setStandardData(standardData);
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
      // initialValues={standardData}
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
        label="Type of farm"
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
                <ProFormDigit
                  width="xs"
                  name="rainfall"
                  label="Rainfall(mm/year)"
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
                  name="pH"
                  label="pH"
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
                  name="salinity"
                  label="Salinity(‰)"
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
                  name="alkalinity"
                  label="Alkalinity(mg/l)"
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
                  name="clarity"
                  label="Clarity(cm)"
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
                <ProFormDigit
                  width="xs"
                  name="temperature"
                  label="Temperature(°C)"
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
