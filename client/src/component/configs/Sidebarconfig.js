import {
  faTachometerAlt,
  faUsers,
  faCog,
  faChartBar,
  faShoppingCart,
  faLifeRing,
  faAngleUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const sidebarConfig = {
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    {
      name: "Manage User",
      path: "/users",
      icon: faUsers,
      options: [
        { name: "Clients", path: "/clients" },
        { name: "Users", path: "/users" },
      ],
    },
    { name: "Subscriptions", path: "/chatbox", icon: faCog },
    { name: "Billings", path: "/chatbox", icon: faCog },
    { name: "Feature and Usage Analytics", path: "/chatbox", icon: faCog },
    { name: "Support Tickets", path: "/chatbox", icon: faCog },
    { name: "Security", path: "/chatbox", icon: faCog },
    { name: "Settings", path: "/chatbox", icon: faCog },
    { name: "Admin Manager", path: "/chatbox", icon: faCog },
    { name: "Notification", path: "/chatbox", icon: faCog },
  ],
  client: [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { name: "Permissions", path: "/permissions", icon: faCog },
    {
      name: "CRM", path: "/crm", icon: faCog, options: [
        { name: "Contacts", path: "/crm/contacts" },
        { name: "Companies", path: "/clients" },
        { name: "Deals", path: "/clients" },
        { name: "Leads", path: "/crm/leads" },
        { name: "Pipeline", path: "/clients" },
        { name: "Projects", path: "/clients" },
        { name: "Tasks", path: "/clients" },
        { name: "Proposals", path: "/clients" },
        { name: "Contracts", path: "/clients" },
        { name: "Invoices", path: "/clients" },
        { name: "Payments", path: "/clients" },
        { name: "Analytics", path: "/clients" },
      ],
    },
    { name: "Calendar", path: "/calendar", icon: faChartBar },
    {
      name: "Manage User",
      icon: faUsers,
      options: [{ name: "Users", path: "/users" }],
    },
    { name: "Reports", path: "/reports", icon: faChartBar },
    { name: "Payment", path: "/payment", icon: faShoppingCart },
    { name: "Analytics", path: "/analytics", icon: faChartBar },
  ],
  user: [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { name: "Support", path: "/support", icon: faLifeRing },
    { name: "Reports", path: "/reports", icon: faChartBar },
    { name: "Calendar", path: "/calendar", icon: faChartBar },
    { name: "Payment", path: "/payment", icon: faShoppingCart },
    { name: "Analytics", path: "/analytics", icon: faChartBar },
  ],
};

export default sidebarConfig;
