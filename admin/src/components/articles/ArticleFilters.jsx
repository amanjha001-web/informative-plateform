import { RotateCcw, Search } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const ArticleFilters = ({ filters = {}, onFilterChange, onReset }) => {
  const { search = "", status = "", category = "" } = filters;

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
    <div className="article-filters">
      <div className="article-filters__search">
        <Input
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Search articles..."
          icon={Search}
        />
      </div>

      <div className="article-filters__field">
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
              value: "published",
              label: "Published",
            },
            {
              value: "draft",
              label: "Draft",
            },
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "archived",
              label: "Archived",
            },
            {
              value: "rejected",
              label: "Rejected",
            },
          ]}
        />
      </div>

      <div className="article-filters__field">
        <Select
          name="category"
          value={category}
          onChange={handleChange}
          options={[
            {
              value: "",
              label: "All Categories",
            },
            {
              value: "technology",
              label: "Technology",
            },
            {
              value: "programming",
              label: "Programming",
            },
            {
              value: "cloud",
              label: "Cloud",
            },
            {
              value: "business",
              label: "Business",
            },
          ]}
        />
      </div>

      <div className="article-filters__actions">
        <Button
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

export default ArticleFilters;
