import React from 'react'
import { ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form' 
import { useTranslation } from 'react-i18next'

const FormFillFarm = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ProFormText
        name="name"
        label={t("Name Farm")}
        placeholder={t("Enter name farm")}
      />
      <ProFormSelect
        name="type"
        width="s"
        label={t("Type Farm")}
        placeholder={t("Select type farm")}
        options={[
          { label: t("Oyster farming"), value: "Oyster farming" },
          { label: t("Cobia farming"), value: "Cobia farming" },
          { label: t("Mangrove forest"), value: "Mangrove forest" },
        ]}
      />
      <ProFormDigit
        name="area"
        label={t("Area(ha)")}
        placeholder={t("Enter area")}
        min={0}
      />
    </div>
  );
}

export default FormFillFarm