import React from 'react'
import { ProForm, ProFormMoney } from '@ant-design/pro-form'
import { Checkbox, Form } from 'antd'
import { useTranslation } from 'react-i18next'

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
            initialValue={5}
            min={0}
            fieldProps={{
              precision: 0,
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
          initialValue={20}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        {typeArea === "Mangrove forest" && (
          <ProFormMoney
            width="xs"
            name="rainfall"
            label="Rainfall(mm/year)"
            tooltip={t("Rainfall")}
            placeholder={false}
            fieldProps={{
              precision: 0,
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
          initialValue={7.5}
          fieldProps={{
            precision: 1,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="salinity"
          label="Salinity(‰)"
          tooltip={t("Salinity")}
          placeholder={false}
          initialValue={20}
          fieldProps={{
            precision: 0,
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
            // initialValue={60}
            fieldProps={{
              precision: 0,
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
            initialValue={20}
            fieldProps={{
              precision: 0,
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
          initialValue={0.3}
          fieldProps={{
            precision: 1,
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
            // initialValue={0.05}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="photsPhat"
            label="Photsphat(mg/l)"
            tooltip={t("Photsphat")}
            placeholder={false}
            fieldProps={{
              precision: 1,
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
              precision: 1,
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
            initialValue={50}
            fieldProps={{
              precision: 0,
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
            initialValue={150}
            fieldProps={{
              precision: 0,
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
            initialValue={5000}
            fieldProps={{
              precision: 0,
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
          initialValue={50}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
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
}

export default FormFillExam