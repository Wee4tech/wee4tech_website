// import HomeIcon from "../Icons/HomeIcon";
// import OrderIcon from "../Icons/OrderIcon";

export const adminMenuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    key: "dashboard",
  },
  {
    label: "Orders",
    path: "/admin/orders",
    key: "orders",
  },

  // {
  //   label: "Return/Exchange",
  //   path: "/admin/test",
  //   key: "return",
  // },
  {
    label: "Requests/Enquiries",
    path: "",
    key: "requests",
    children: [
      {
        key: "RFQs",
        title: "RFQ’s",
        path: "/admin/rfq",
      },
      // {
      //   key: "sellerRegistration",
      //   title: "Seller registration",
      //   path: "",
      // },
      // {
      //   key: "emailSubscription",
      //   title: "Email subscription",
      //   path: "",
      // },
      // {
      //   key: "cantFindProduct",
      //   title: "Can’t find product",
      //   path: "",
      // },
    ],
  },
  {
    label: "Products",
    path: "/admin/products",
    key: "product",
  },
  {
    label: "Sellers",
    path: "/admin/sellers",
    key: "sellers",
  },
  {
    label: "Customer",
    path: "",
    key: "customer",
    children: [
      {
        key: "CustomerCRM",
        title: "Customer CRM",
        path: "/admin/customer/customer-crm",
      },
      {
        key: "WalletBankTransfer",
        title: "Wallet Bank Transfer",
        path: "/admin/customer/walletbankTransfer",
      },
      // {
      //   key: "mobCredit",
      //   title: "Mob Credit",
      //   path: "/admin/customer/mobCredit",
      // },
    ],
  },

  {
    label: "Forms",
    path: "",
    key: "forms",
    children: [
      {
        key: "BecomeSeller",
        title: "Become a seller",
        path: "/admin/forms/becomeSeller",
      },
      {
        key: " LineOfCredits",
        title: "Line of credits",
        path: "/admin/forms/lineOfCredits",
      },
    ],
  },

  {
    label: "Reports",
    path: "",
    key: "reports",
    children: [
      {
        key: "CustomerDetails",
        title: "Customer Details",
        path: "/admin/report/customerDetails",
      },

      {
        key: "OrderReport",
        title: "Order Report",
        path: "/admin/report/orderReport",
      },
      {
        key: "SalesReport",
        title: "Sales Report",
        path: "/admin/report/salesReport",
      },

      {
        key: "SellerSalesReport",
        title: "Seller Sales Report",
        path: "/admin/report/sellerSalesReport",
      },
      {
        key: "InvoiceReport",
        title: "Invoice report",
        path: "/admin/report/invoiceReport",
      },
      {
        key: "CancelledReport",
        title: "Cancelled Report",
        path: "/admin/report/cancelledReport",
      },
      {
        key: "mobCreditsReport",
        title: "mobCredit report",
        path: "/admin/report/mobCreditsReport",
      },
      {
        key: "mobPROReport",
        title: "mobPRO report",
        path: "/admin/report/mobPROReport",
      },
      {
        key: "PgSettlementReport",
        title: "PG Settlement Report",
        path: "/admin/report/settlementReport",
      },
      {
        key: "CategorySalesReport",
        title: "Category sales report",
        path: "/admin/report/categorySalesReport",
      },
      {
        key: "ServiceRequestReport",
        title: "Service request report",
        path: "/admin/report/service-request-report",
      },
    ],
  },
  {
    label: "Settlement",
    path: "/admin/pending-settlement",
    key: "settlement",
  },
  //  {
  //   label: "Categories",
  //   path: "/admin/categories",
  //   key: "categories",
  // },
  //  {
  //   label: "Manage state",
  //   path: "/admin/manageState",
  //   key: "manageState",
  // },
  //  {
  //   label: "Manage vehicle type",
  //   path: "/admin/manageVehicle",
  //   key: "manageVehicle",
  // },
  //  {
  //   label: "Manage city",
  //   path: "/admin/manageCity",
  //   key: "manageCity",
  // },
  // {
  //   label: "Account and Settings",
  //   path: "",
  //   key: "accounts",
  // },
];

export const sellerMenuItems = [
  {
    label: "Catalogue",
    path: "/admin/sellers/catalogue",
    key: "catalogue",
  },
  {
    label: "Inventory & price",
    path: "/admin/sellers/inventory-and-price",
    key: "inventoryAndPrice",
  },
  {
    label: "MOB library",
    path: "/admin/sellers/mob-library",
    key: "mobLibrary",
  },
];

export const sellerRoutes = [
  "/admin/sellers/catalogue",
  "/admin/sellers/update-pricing",
  "/admin/sellers/inventory-and-price",
  "/admin/sellers/mob-library",
];
