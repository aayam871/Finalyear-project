# Delivery Agent Dashboard

This folder contains all components, layouts, and routes for the Delivery Agent Dashboard in QuickBites.

## Structure
- `AgentDashboardLayout.jsx`: Main layout with header, sidebar, and content area.
- `AgentRoutes.jsx`: Routing for all delivery agent dashboard pages.
- `Header.jsx`: Top header with logo, dashboard title, and profile/logout dropdown.
- `Sidebar.jsx`: Sidebar navigation for dashboard sections.
- `Dashboard.jsx`: Main dashboard with daily metrics and active deliveries.
- `AssignedOrders.jsx`: List of currently assigned orders.
- `OrderDetailsModal.jsx`: Modal for viewing order details.
- `OrderHistory.jsx`: List of completed deliveries.
- `VerifyDelivery.jsx`: OTP-based delivery verification.
- `MapNavigation.jsx`: Embedded OpenStreetMap for route visualization.
- `CODManagement.jsx`: Cash on Delivery management.
- `DeliveryCharges.jsx`: View delivery charges per order.

## Notes
- All delivery agent features and UI are isolated here.
- The global navbar and footer are hidden for delivery agent routes.
- Refer to this folder for any delivery agent-specific logic or UI. 