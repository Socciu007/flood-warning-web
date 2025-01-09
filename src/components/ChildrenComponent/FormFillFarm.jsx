import React, { useState, useEffect } from "react";
import {
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormDependency,
} from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllRegion } from "../../services/serviceArea";

const FormFillFarm = ({ formRef }) => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
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
      {currentUser?.role === "admin" && (
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
          fieldProps={{
            onChange: () => {
              formRef?.current?.setFieldValue("nameArea", undefined);
            },
          }}
        />
      )}
      {currentUser?.role === "admin" && (
        <ProFormDependency name={["province"]}>
          {({ province }) => {
            const filterNameArea = regions
              .filter((region) => region.province === province)
              .map((region) => ({ label: region.name, value: region.name }));
            return (
              <ProFormSelect
                name="nameArea"
                label={t("Name Area")}
                placeholder={t("Select name area")}
                options={filterNameArea}
              />
            );
          }}
        </ProFormDependency>
      )}
      <ProFormText
        name="name"
        label={t("Name Farm")}
        placeholder={t("Enter name farm")}
      />
      <ProFormSelect
        name="type"
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
        label={t("Area (ha)")}
        placeholder={t("Enter area")}
        min={0}
        fieldProps={{
          precision: 2,
          formatter: (value) => {
            return value ? parseFloat(value).toString() : "";
          },
        }}
      />
    </div>
  );
};

export default FormFillFarm;
