import { Tooltip as ReactTooltip } from "react-tooltip";

const Tooltip = () => {
  return (
    <ReactTooltip
      id="tooltip"

      render={({ content }) => content && content}
      className="!bg-black !py-1 !px-1 !rounded-md !text-xs"
    />
  );
};

export default Tooltip;
