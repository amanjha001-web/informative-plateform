import { RotateCcw, Search } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const EnquiryFilters = ({ filters = {}, onFilterChange, onReset }) => {
  const { search = "", status = "" } = filters;

  const handleChange = (event) => {
    const { name, value } = event.target;

    onFilterChange?.({
      ...filters,
      [name]: value,
    });
  };

  const handleReset = () => {
    onReset?.();
  };

  return (
    <div className="enquiry-filters">
      <div className="enquiry-filters__search">
        <Input
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Search enquiries..."
          icon={Search}
        />
      </div>

      <div className="enquiry-filters__field">
        <Select
          name="status"
          value={status}
          onChange={handleChange}
          options={[
            {
              value: "",
              label: "All Status",
            },
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "replied",
              label: "Replied",
            },
            {
              value: "resolved",
              label: "Resolved",
            },
            {
              value: "closed",
              label: "Closed",
            },
          ]}
        />
      </div>

      <div className="enquiry-filters__actions">
        <Button
          type="button"
          variant="secondary"
          size="md"
          icon={RotateCcw}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnquiryFilters;
