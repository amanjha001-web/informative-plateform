import { useMemo, useState } from "react";

import EnquiryDetails from "../components/enquiries/EnquiryDetails";
import EnquiryFilters from "../components/enquiries/EnquiryFilters";
import EnquiryTable from "../components/enquiries/EnquiryTable";

import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Pagination from "../components/common/Pagination";

const ITEMS_PER_PAGE = 10;

const INITIAL_FILTERS = {
  search: "",
  status: "",
};

const INITIAL_ENQUIRIES = [
  {
    id: "enquiry-001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    subject: "Article Collaboration",
    message:
      "I would like to know more about contributing articles to the platform.",
    status: "pending",
    createdAt: "07 Sep 2026",
  },
  {
    id: "enquiry-002",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 9876543211",
    subject: "Partnership Enquiry",
    message:
      "We are interested in discussing a possible partnership opportunity.",
    status: "replied",
    createdAt: "06 Sep 2026",
  },
  {
    id: "enquiry-003",
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 9876543212",
    subject: "Technical Support",
    message:
      "I am facing an issue while accessing some articles on the platform.",
    status: "resolved",
    createdAt: "05 Sep 2026",
  },
  {
    id: "enquiry-004",
    name: "Neha Gupta",
    email: "neha@example.com",
    phone: "",
    subject: "Advertising",
    message: "Please share the available advertising options and pricing.",
    status: "pending",
    createdAt: "04 Sep 2026",
  },
  {
    id: "enquiry-005",
    name: "Rohit Kumar",
    email: "rohit@example.com",
    phone: "+91 9876543213",
    subject: "Account Issue",
    message: "I need help updating my account information.",
    status: "closed",
    createdAt: "03 Sep 2026",
  },
  {
    id: "enquiry-006",
    name: "Anjali Singh",
    email: "anjali@example.com",
    phone: "+91 9876543214",
    subject: "Content Suggestion",
    message: "I would like to suggest a new topic for your platform.",
    status: "replied",
    createdAt: "02 Sep 2026",
  },
];

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const [deleteEnquiry, setDeleteEnquiry] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredEnquiries = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !query ||
        enquiry.name?.toLowerCase().includes(query) ||
        enquiry.email?.toLowerCase().includes(query) ||
        enquiry.subject?.toLowerCase().includes(query) ||
        enquiry.message?.toLowerCase().includes(query);

      const matchesStatus =
        !filters.status || enquiry.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, filters]);

  const totalPages = Math.max(
    Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE),
    1,
  );

  const paginatedEnquiries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredEnquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEnquiries, currentPage]);

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedEnquiry(null);
  };

  const handleDeleteRequest = (enquiry) => {
    setDeleteEnquiry(enquiry);
  };

  const handleDeleteConfirm = () => {
    if (!deleteEnquiry) {
      return;
    }

    const deleteId = deleteEnquiry.id || deleteEnquiry._id;

    setEnquiries((current) =>
      current.filter((enquiry) => (enquiry.id || enquiry._id) !== deleteId),
    );

    setDeleteEnquiry(null);
  };

  const handleStatusChange = (enquiry, status) => {
    const enquiryId = enquiry.id || enquiry._id;

    setEnquiries((current) =>
      current.map((item) =>
        (item.id || item._id) === enquiryId
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );

    if (
      selectedEnquiry &&
      (selectedEnquiry.id || selectedEnquiry._id) === enquiryId
    ) {
      setSelectedEnquiry((current) => ({
        ...current,
        status,
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="enquiries-page">
      <div className="enquiries-page__header">
        <div>
          <h1 className="enquiries-page__title">Enquiries</h1>

          <p className="enquiries-page__description">
            Manage customer enquiries and track their response status.
          </p>
        </div>
      </div>

      <section className="enquiries-page__content">
        <div className="enquiries-page__toolbar">
          <EnquiryFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          <div className="enquiries-page__count">
            {filteredEnquiries.length}{" "}
            {filteredEnquiries.length === 1 ? "enquiry" : "enquiries"} found
          </div>
        </div>

        <EnquiryTable
          enquiries={paginatedEnquiries}
          onView={handleView}
          onDelete={handleDeleteRequest}
          onStatusChange={handleStatusChange}
        />

        {filteredEnquiries.length > 0 && (
          <div className="enquiries-page__pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <Drawer
        open={detailsOpen}
        onClose={handleCloseDetails}
        title="Enquiry Details"
      >
        {selectedEnquiry && <EnquiryDetails enquiry={selectedEnquiry} />}
      </Drawer>

      <ConfirmDialog
        open={Boolean(deleteEnquiry)}
        title="Delete Enquiry"
        description={
          deleteEnquiry
            ? `Are you sure you want to delete the enquiry from "${deleteEnquiry.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteEnquiry(null)}
      />
    </div>
  );
};

export default Enquiries;
