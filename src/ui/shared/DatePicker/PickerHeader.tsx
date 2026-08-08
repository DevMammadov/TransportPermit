import Select from "@/ui/shared/Select";
import { range } from "lodash";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "İyun",
  "İyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

const PickerHeader = ({
  date,
  changeYear,
  changeMonth,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div className="px-1 flex items-center h-7 gap-2">
      <Select
        value={months[date.getMonth()]}
        onChange={(value) => changeMonth(months.indexOf(value as string))}
        data={months}
        optionLabel={(d) => d}
        optionValue={(d) => d}
        labelPosition="inside"
        // className="w-1/2 h-auto"
        // classNames={{
        //   input: "rounded-small pr-1 pl-2 h-auto py-1",
        //   icon: "h-4 w-4",
        //   value: "font-bold",
        // }}
        className="w-1/2 h-8 bg-gray-100"
        classNames={{
          input:
            "rounded-md border-gray-200  h-8 px-2 py-2 text-sm font-semibold flex items-center justify-between bg-white transition-colors",
          icon: "h-3.5 w-3.5 text-gray-500",
          value: "font-semibold text-sm text-gray-800 mt-1",
          options:
            "text-sm sm:text-sm max-h-48 w-full rounded-md shadow-lg border border-gray-100 py-0.5",
          option: "py-1 pl-4 text-sm cursor-pointer hover:bg-blue-50 hover:text-gray-900",
        }}
      />

      <Select
        value={date.getFullYear().toString()}
        onChange={(value) => changeYear(Number(value))}
        data={range(1900, new Date().getFullYear() + 1)}
        optionLabel={(d) => d.toString()}
        optionValue={(d) => d.toString()}
        labelPosition="inside"
        // className="w-1/2 h-auto"
        // classNames={{
        //   input: "rounded-small pr-1 pl-2 h-auto py-1",
        //   icon: "h-4 w-4",
        //   value: "font-bold",
        // }}
        className="w-1/2 h-8 bg-gray-100"
        classNames={{
          input:
            "rounded-md border-gray-200  h-8 px-2 py-2 text-sm font-semibold flex items-center justify-between bg-white transition-colors",
          icon: "h-3.5 w-3.5 text-gray-500",
          value: "font-semibold text-sm text-gray-800 mt-1",
          options:
            "text-sm sm:text-sm max-h-48 w-full rounded-md shadow-lg border border-gray-100 py-0.5",
          option: "py-1 pl-4 text-sm cursor-pointer hover:bg-blue-50 hover:text-gray-900",
        }}
      />
    </div>
  );
};

export default PickerHeader;
