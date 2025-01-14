import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormDependency,
  ProFormDigitRange,
} from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";

const FormFillStandardData = ({ onFinish }) => {
  const { t } = useTranslation();
  const { standardData } = useSelector((state) => state.standardData);
  const [typeArea, setTypeArea] = useState("");
  const formRef = useRef(null);

  // Handle change type area
  const handleChangeTypeArea = (value) => {
    setTypeArea(value);
    // Get standard values default
    const standardValues =
      standardData.find((item) => item.type === value) || {};

    // Reset fields in form, keep typeArea value
    formRef.current.setFieldsValue({
      ...standardValues, // Update other fields
      typeArea: value, // Keep typeArea value
    });
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
      formRef={formRef}
      className="proform-standard-data"
      submitter={{
        render: (props, dom) => {
          return <div className="proform-standard-data-submitter">{dom}</div>;
        },
        searchConfig: {
          submitText: t("Save"),
          resetText: t("Back"),
        },
        submitButtonProps: {
          style: {
            display:
              standardData?.find((item) => item.type === typeArea) &&
              Object.keys(standardData?.find((item) => item.type === typeArea))
                .length > 0
                ? "inline-block"
                : "none",
          },
        },
        resetButtonProps: {
          style: {
            display:
              standardData?.find((item) => item.type === typeArea) &&
              Object.keys(standardData?.find((item) => item.type === typeArea))
                .length > 0
                ? "inline-block"
                : "none",
          },
          onClick: () => {
            setTypeArea("");
          },
        },
      }}
      onFinish={onFinish}
    >
      <ProFormSelect
        options={optionsFarm}
        width="md"
        name="typeArea"
        label={t("Choose the adjustment breeding area:")}
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
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.DO?.[0] || 0
                  }
                  placeholder={false}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.temperatureRight?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.temperatureRight?.[1] || 0,
                  ]}
                  separator="-"
                  separatorWidth={30}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Mangrove forest" && (
                <ProFormDigitRange
                  width="xs"
                  name="rainfall"
                  label="Rainfall(mm/year)"
                  separator="-"
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.rainfall?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.rainfall?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.pH?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.pH?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.salinity?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.salinity?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.alkalinity?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.alkalinity?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigitRange
                  width="xs"
                  name="clarity"
                  label="Clarity(cm)"
                  separator="-"
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.clarity?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.clarity?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.ammonia?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.H2S?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  separatorWidth={30}
                  initialValue={[
                    standardData?.find((item) => item.type === typeArea)
                      ?.temperature?.[0] || 0,
                    standardData?.find((item) => item.type === typeArea)
                      ?.temperature?.[1] || 0,
                  ]}
                  placeholder={[false, false]}
                  min={0}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="photsPhat"
                  label="Photsphat(mg/l)"
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.photsPhat?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="BOD5"
                  label="BOD₅(mg/l)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.BOD5?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="COD"
                  label="COD(mg/l)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.COD?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigit
                  width="xs"
                  name="coliform"
                  label="Coliform(MPN/100ml)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.coliform?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.suspendedSolids?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Cobia farming" ||
                typeArea === "Oyster farming") && (
                <ProFormDigit
                  width="xs"
                  name="CN"
                  label="CN-(mg/l)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.CN?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="As"
                  label={`${
                    typeArea === "Mangrove forest" ? "As(mg/kg)" : "As(mg/l)"
                  }`}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.As?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Cd"
                  label={`${
                    typeArea === "Mangrove forest" ? "Cd(mg/kg)" : "Cd(mg/l)"
                  }`}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Cd?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Pb"
                  label={`${
                    typeArea === "Mangrove forest" ? "Pb(mg/kg)" : "Pb(mg/l)"
                  }`}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Pb?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Cu"
                  label={`${
                    typeArea === "Mangrove forest" ? "Cu(mg/kg)" : "Cu(mg/l)"
                  }`}
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Cu?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Oyster farming" && (
                <ProFormDigit
                  width="xs"
                  name="Hg"
                  label="Hg(mg/l)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Hg?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Mangrove forest" ||
                typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="Zn"
                  label={`${
                    typeArea === "Mangrove forest" ? "Zn(mg/kg)" : "Zn(mg/l)"
                  }`}
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Zn?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="F"
                  label="F-(mg/l)"
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.F?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Cr6"
                  label="Cr6+(mg/l)"
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Cr6?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Mn"
                  label="Mn(mg/l)"
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Mn?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="Fe"
                  label="Fe(mg/l)"
                  placeholder={false}
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.Fe?.[0] || 0
                  }
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {(typeArea === "Oyster farming" ||
                typeArea === "Cobia farming") && (
                <ProFormDigit
                  width="xs"
                  name="totalCrom"
                  label="Total Crom(mg/l)"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.totalCrom?.[0] || 0
                  }
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
                  }}
                />
              )}
              {typeArea === "Cobia farming" && (
                <ProFormDigit
                  width="xs"
                  name="totalPH"
                  initialValue={
                    standardData?.find((item) => item.type === typeArea)
                      ?.totalPH?.[0] || 0
                  }
                  label="TOG(mg/l)"
                  tooltip={t("Total oil and grease")}
                  placeholder={false}
                  fieldProps={{
                    precision: 4,
                    controls: false,
                    formatter: (value) => {
                      return value ? parseFloat(value).toString() : "";
                    },
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
