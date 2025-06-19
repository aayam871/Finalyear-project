import Hedar from "./Dashboard/Hedar";
import StatCards from "./Dashboard/StatCards";
import AgentVerification from "./Dashboard/AgentVerification";
import UsersManagement from "./Dashboard/UsersManagement";
import AddCategoryForm from "./Dashboard/MenuManagement/AddCategoryForm";
import AddMenuItemForm from "./Dashboard/MenuManagement/AddMenuItemForm";
import AddVariantForm from "./Dashboard/MenuManagement/AddVariantForm";
import AddAddOnForm from "./Dashboard/MenuManagement/AddAddOnForm";
import ManageItemsList from "./Dashboard/MenuManagement/ManageItemsList";
import OrderManagement from "./Dashboard/OrderManagement";
import AgentEarnings from "./Dashboard/AgentEarnings";
import AgentSalaries from "./Dashboard/AgentSalaries";
import FoodItemManagement from "./Dashboard/FoodItemManagement";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <Hedar title="Admin Dashboard" />
      <StatCards />

      {/* Agent Section */}
      <AgentVerification />

      {/* Users Section */}
      <UsersManagement />

      {/* Menu & Categories */}
      <AddCategoryForm />
      <AddMenuItemForm />
      <AddVariantForm />
      <AddAddOnForm />
      <ManageItemsList />

      {/* Orders Section */}
      <OrderManagement />

      {/* Earnings and Salaries */}
      <AgentEarnings />
      <AgentSalaries />

      {/* Food Item Management */}
      <FoodItemManagement />
    </div>
  );
};

export default AdminDashboard;
