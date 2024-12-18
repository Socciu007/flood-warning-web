import React from "react";
import { ProForm, ProFormMoney } from "@ant-design/pro-form";
import { Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const FormFillExam = ({ typeArea }) => {
  const { t } = useTranslation();
  return (
    <>
      <ProForm.Group className="exam-form">
        {(typeArea === "Oyster farming" || typeArea === "Cobia farming") && (
          <ProFormMoney
            width="xs"
            name="DO"
            label="DO(mg/l)"
            placeholder={false}
            tooltip={t("Dissolved oxygen")}
            min={0}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="temperatureRight"
            label={
              typeArea === "Mangrove forest"
                ? "Air temperature(°C)"
                : "Suitable temperature(°C)"
            }
            placeholder={false}
            tooltip={t("Temperature")}
            min={0}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Mangrove forest" && (
          <ProFormMoney
            width="xs"
            name="rainfall"
            label="Rainfall(mm/year)"
            tooltip={t("Rainfall")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="pH"
          label="pH"
          tooltip={t("pH")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="salinity"
          label="Salinity(‰)"
          tooltip={t("Salinity")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="alkalinity"
            label="Alkalinity(mg/l)"
            tooltip={t("Alkalinity")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Oyster farming" && (
          <ProFormMoney
            width="xs"
            name="clarity"
            label="Clarity(cm)"
            tooltip={t("Clarity")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="ammonia"
          label="NH₃(mg/l)"
          tooltip={t("Ammonia")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {typeArea !== "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="H2S"
            label="H₂S(mg/l)"
            tooltip={t("H2S")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="temperature"
          label="Temperature(°C)"
          tooltip={t("Temperature")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="photsPhat"
            label="Photsphat(mg/l)"
            tooltip={t("Photsphat")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="BOD5"
            label="BOD₅(mg/l)"
            tooltip={t("BOD5")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="COD"
            label="COD(mg/l)"
            tooltip={t("COD")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Oyster farming" && (
          <ProFormMoney
            width="xs"
            name="coliform"
            label="Coliform(MPN/100ml)"
            tooltip={t("Coliform")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="suspendedSolids"
          label="TSS(mg/l)"
          tooltip={t("TSS")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {typeArea !== "Mangrove forest" && (
          <ProFormMoney
            width="xs"
            name="CN"
            label="CN-(mg/l)"
            tooltip={t("CN-")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="As"
          label="As(mg/l)"
          tooltip={t("As")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="Cd"
          label="Cd(mg/l)"
          tooltip={t("Cd")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="Pb"
          label="Pb(mg/l)"
          tooltip={t("Pb")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="Cu"
          label="Cu(mg/l)"
          tooltip={t("Cu")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {typeArea === "Oyster farming" && (
          <ProFormMoney
            width="xs"
            name="Hg"
            label="Hg(mg/l)"
            tooltip={t("Hg")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        <ProFormMoney
          width="xs"
          name="Zn"
          label="Zn(mg/l)"
          tooltip={t("Zn")}
          placeholder={false}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="F"
            label="F-(mg/l)"
            tooltip={t("F-")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="Cr6"
            label="Cr6+(mg/l)"
            tooltip={t("Cr6+")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="Mn"
            label="Mn(mg/l)"
            tooltip={t("Mn")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="Fe"
            label="Fe(mg/l)"
            tooltip={t("Fe")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Oyster farming" || typeArea === "Cobia farming") && (
          <ProFormMoney
            width="xs"
            name="totalCrom"
            label="Total Crom(mg/l)"
            tooltip={t("Total Crom")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="totalPH"
            label="Total MG(mg/l)"
            tooltip={t("Total mineral oil and grease")}
            placeholder={false}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
      </ProForm.Group>
      <Form.Item
        className="auto-send-mail"
        valuePropName="checked"
        name="autoSendMail"
      >
        <Checkbox>{t("Automatically send results by mail")}</Checkbox>
      </Form.Item>
    </>
  );
};

export default FormFillExam;
