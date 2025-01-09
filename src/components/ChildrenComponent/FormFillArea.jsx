import React, { useState, useEffect } from "react";
import { ProFormText, ProFormSelect, ProFormDigit } from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";
import { getAllRegion } from "../../services/serviceArea";

const FormFillArea = () => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);

  // Get all regions
  const fetchAllRegion = async () => {
    const res = await getAllRegion();
    setRegions(res.data);
  };

  // set regions
  useEffect(() => {
    fetchAllRegion();
  }, []);

  return (
    <div>
      <ProFormText
        name="name"
        label={t("Name Area")}
        placeholder={t("Enter name area")}
      />
      <ProFormSelect
        name="province"
        label={t("Province")}
        placeholder={t("Select province")}
        options={[...new Set(regions.map((region) => region.province))].map(
          (province) => ({
            label: province,
            value: province,
          })
        )}
      />
      <ProFormDigit
        name="longitude"
        label={t("Longitude")}
        placeholder={t("Enter longitude")}
        fieldProps={{
          precision: 4,
          formatter: (value) => {
            return value ? parseFloat(value).toString() : "";
          },
        }}
      />
      <ProFormDigit
        name="latitude"
        label={t("Latitude")}
        placeholder={t("Enter latitude")}
        fieldProps={{
          precision: 4,
          formatter: (value) => {
            return value ? parseFloat(value).toString() : "";
          },
        }}
      />
    </div>
  );
};

export default FormFillArea;
