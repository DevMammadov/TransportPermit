import { BlankDto } from "@/data/dto/blank.dto";
import { TColumn } from "@/ui/shared/DataTable/TDataTable";

export const usePermitColumns = () => {
  const columns: TColumn<BlankDto>[] = [
    {
      field: "permit",
      title: "Kod",
      render: (item) => item.permit.code,
    },
    {
      field: "permit",
      title: "Göndərən ölkə",
      render: (item) => item.permit.country,
    },
    {
      field: "permit",
      title: "İcazənin növü",
      render: (item) => item.permit.category,
    },
    {
      field: "totalCount",
      title: "Ümümi say",
    },
    {
      field: "issuedCount",
      title: "Verilmiş say",
    },
    {
      field: "remainingCount",
      title: "Qalıq say",
    },
    {
      field: "additionalCount",
      title: "Baza / Əlavə",
    },
    {
      field: "permit",
      title: "Defisitlik dərəcəsi",
      render: (item) => item.permit.deficiencyLevelType,
    },
    {
      field: "applicableYear",
      title: "Qüvvədə olan il",
    },
  ];

  return { columns };
};
