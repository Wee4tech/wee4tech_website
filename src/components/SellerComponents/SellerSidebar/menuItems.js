

export const sellerMenuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    key: "dashboard",
  },
  

  {
    label: "Reports",
    path: "",
    key: "reports",
    children: [
  

        {
          key: "ContactUs",
          title: "Contact us",
          path: "/contactusreport",
        },
        {
          key: "Carriers",
          title: "Job careers",
          path: "/carriersreport",
        },
        {
          key: "datatracks",
          title: "Data Tracks",
          path: "/datatracks",
        },
    
      
    ],
  },

  {
    label: "Account and Settings",
    path: "/Accountsandsettings",
    key: "accounts",
  },
];


// export const sellerMenuItems = [
//   {
//     label: "Catalogue",
//     path: "/admin/sellers/catalogue",
//     key: "catalogue",
//   },
//   {
//     label: "Inventory & price",
//     path: "/admin/sellers/inventory-and-price",
//     key: "inventoryAndPrice",
//   },
//   {
//     label: "MOB library",
//     path: "/admin/sellers/mob-library",
//     key: "mobLibrary",
//   },
// ];

export const sellerRoutes = [
  "/admin/sellers/catalogue",
  "/admin/sellers/update-pricing",
  "/admin/sellers/inventory-and-price",
  "/admin/sellers/mob-library",
];
