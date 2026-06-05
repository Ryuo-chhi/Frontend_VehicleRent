import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { 
  HiOutlineTruck, 
  HiOutlineUserGroup, 
  HiOutlineClipboardList, 
  HiOutlineCurrencyDollar,
  HiOutlineCog,
  HiOutlineTag,
  HiOutlineUsers
} from "react-icons/hi";
import toast from "react-hot-toast";

// Import tabs
import VehiclesTab from "../components/dashboard/VehiclesTab";
import RentalsTab from "../components/dashboard/RentalsTab";
import CustomersTab from "../components/dashboard/CustomersTab";
import RevenueTab from "../components/dashboard/RevenueTab";
import MaintenanceTab from "../components/dashboard/MaintenanceTab";
import PromotionsTab from "../components/dashboard/PromotionsTab";
import StaffTab from "../components/dashboard/StaffTab";

// Import modals
import VehicleModal from "../components/modals/VehicleModal";
import ReturnModal from "../components/modals/ReturnModal";
import RentModal from "../components/modals/RentModal";
import ConfirmModal from "../components/modals/ConfirmModal";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isStaff = token && (role === "MANAGER" || role === "REGULAR");

  const [staffUsername, setStaffUsername] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffLoginError, setStaffLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [activeRentals, setActiveRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Forms and Modals State
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    type: "Car",
    powerSource: "gasoline",
    vehicleClass: "sedan",
    vehicleBrand: "",
    vehicleModel: "",
    rentalRatePerDay: "",
    vehicleLicence: "",
    licencePlate: "",
    numberOfSeats: "4",
    helmetIncluded: false
  });

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [returnForm, setReturnForm] = useState({
    payDate: new Date().toISOString().split('T')[0],
    paymentMethod: "CASH",
    discount: 0,
    damageFee: 0,
    extraDays: 0
  });

  const [showRentModal, setShowRentModal] = useState(false);
  const [rentForm, setRentForm] = useState({
    vehicleId: "",
    customerId: "",
    rentDays: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deposit: 0
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    message: "",
    onConfirm: () => {}
  });

  const requestConfirm = (message, action) => {
    setConfirmModal({
      show: true,
      message,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, show: false }));
        await action();
      }
    });
  };

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setStaffLoginError("");
    try {
      const data = await api.login(staffUsername, staffPassword);
      if (data.role === "MANAGER" || data.role === "REGULAR") {
        window.location.reload();
      } else {
        api.logout();
        setStaffLoginError("Access Denied. Customers do not have access to the staff portal.");
      }
    } catch (err) {
      setStaffLoginError("Invalid staff credentials.");
    }
  };

  useEffect(() => {
    if (isStaff) {
      fetchData();
    }
  }, [activeTab, isStaff]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "vehicles") {
        const data = await api.get("/api/vehicles");
        setVehicles(data);
      } else if (activeTab === "customers") {
        const data = await api.get("/api/customers");
        setCustomers(data);
      } else if (activeTab === "rentals") {
        const active = await api.get("/api/rentals/active");
        const history = await api.get("/api/rentals/history");
        setActiveRentals(active);
        setRentalHistory(history);
      } else if (activeTab === "revenue") {
        const rev = await api.get("/api/rentals/revenue");
        setRevenue(rev);
      } else if (activeTab === "maintenance") {
        const data = await api.get("/api/maintenance-records");
        setMaintenanceRecords(data);
      } else if (activeTab === "promotions") {
        const data = await api.get("/api/promotions");
        setPromotions(data);
      } else if (activeTab === "staff") {
        const data = await api.get("/api/staffs");
        setStaffList(Array.isArray(data) ? data : [...data]);
      }
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create Vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const endpoint = vehicleForm.type === "Car" ? "/api/vehicles/cars" : "/api/vehicles/motos";
      const payload = {
        vehicleType: vehicleForm.type,
        powerSource: vehicleForm.powerSource,
        vehicleClass: vehicleForm.vehicleClass,
        vehicleBrand: vehicleForm.vehicleBrand,
        vehicleModel: vehicleForm.vehicleModel,
        rentalRatePerDay: parseFloat(vehicleForm.rentalRatePerDay),
        vehicleLicence: vehicleForm.vehicleLicence,
        licencePlate: vehicleForm.licencePlate,
        ...(vehicleForm.type === "Car" 
          ? { numberOfSeats: parseInt(vehicleForm.numberOfSeats) } 
          : { helmetIncluded: vehicleForm.helmetIncluded })
      };

      await api.post(endpoint, payload);
      setShowVehicleModal(false);
      setVehicleForm({
        type: "Car", powerSource: "gasoline", vehicleClass: "sedan",
        vehicleBrand: "", vehicleModel: "", rentalRatePerDay: "",
        vehicleLicence: "", licencePlate: "", numberOfSeats: "4",
        helmetIncluded: false
      });
      fetchData();
      toast.success("Vehicle added successfully");
    } catch (err) {
      toast.error("Failed to add vehicle: " + err.message);
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (id) => {
    requestConfirm("Are you sure you want to delete this vehicle?", async () => {
      try {
        await api.delete(`/api/vehicles/${id}`);
        fetchData();
        toast.success("Vehicle deleted successfully");
      } catch (err) {
        toast.error("Failed to delete vehicle: " + err.message);
      }
    });
  };

  // Open Return Modal
  const openReturnModal = (rental) => {
    setSelectedRental(rental);
    setShowReturnModal(true);
  };

  // Process Return
  const handleReturnVehicle = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/rentals/${selectedRental.rentId}/return`, {
        payDate: returnForm.payDate,
        paymentMethod: returnForm.paymentMethod,
        discount: parseFloat(returnForm.discount),
        damageFee: parseFloat(returnForm.damageFee),
        extraDays: parseInt(returnForm.extraDays)
      });
      setShowReturnModal(false);
      fetchData();
      toast.success("Vehicle returned successfully");
    } catch (err) {
      toast.error("Failed to return vehicle: " + err.message);
    }
  };

  // Create Rental
  const handleCreateRental = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/rentals', {
        vehicleId: parseInt(rentForm.vehicleId),
        customerId: parseInt(rentForm.customerId),
        staffId: 1,
        staffUsername: localStorage.getItem('username') || 'root_admin',
        rentDays: parseInt(rentForm.rentDays),
        startDate: rentForm.startDate,
        endDate: rentForm.endDate,
        deposit: parseFloat(rentForm.deposit)
      });
      setShowRentModal(false);
      fetchData();
      toast.success("Rental created successfully");
    } catch (err) {
      toast.error("Failed to create rental: " + err.message);
    }
  };

  // Delete Customer
  const handleDeleteCustomer = async (id) => {
    requestConfirm("Are you sure you want to delete this customer?", async () => {
      try {
        await api.delete(`/api/customers/${id}`);
        fetchData();
        toast.success("Customer deleted successfully");
      } catch (err) {
        toast.error("Failed to delete customer: " + err.message);
      }
    });
  };
  
  // Delete Staff
  const handleDeleteStaff = async (id) => {
    requestConfirm("Delete this staff member?", async () => {
      try {
        await api.delete(`/api/staffs/${id}`);
        fetchData();
        toast.success("Staff member deleted successfully");
      } catch (err) {
        toast.error("Failed to delete staff: " + err.message);
      }
    });
  };

  if (!isStaff) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              VRMS Staff Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to manage system resources
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleStaffLogin}>
            {staffLoginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
                {staffLoginError}
              </div>
            )}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={staffUsername}
                  onChange={(e) => setStaffUsername(e.target.value)}
                  placeholder="e.g. root_admin"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm w-full"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Staff Management Dashboard</h1>

        {/* Sidebar / Tabs */}
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
              <button onClick={() => setActiveTab("vehicles")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "vehicles" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineTruck size={20} /> Vehicles
              </button>
              <button onClick={() => setActiveTab("rentals")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "rentals" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineClipboardList size={20} /> Rentals & Booking
              </button>
              <button onClick={() => setActiveTab("customers")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "customers" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineUserGroup size={20} /> Customers
              </button>
              <button onClick={() => setActiveTab("revenue")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "revenue" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineCurrencyDollar size={20} /> Revenue Statistics
              </button>
              <button onClick={() => setActiveTab("maintenance")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "maintenance" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineCog size={20} /> Maintenance
              </button>
              <button onClick={() => setActiveTab("promotions")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "promotions" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                <HiOutlineTag size={20} /> Promotions
              </button>
              {role === "MANAGER" && (
                <button onClick={() => setActiveTab("staff")} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "staff" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <HiOutlineUsers size={20} /> Staff Management
                </button>
              )}
            </nav>
          </aside>

          {/* Main Display Area */}
          <section className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {activeTab === "vehicles" && <VehiclesTab isLoading={isLoading} vehicles={vehicles} onAddVehicleClick={() => setShowVehicleModal(true)} onDeleteVehicle={handleDeleteVehicle} />}
            {activeTab === "rentals" && <RentalsTab isLoading={isLoading} activeRentals={activeRentals} rentalHistory={rentalHistory} onNewRentalClick={() => setShowRentModal(true)} onReturnClick={openReturnModal} />}
            {activeTab === "customers" && <CustomersTab isLoading={isLoading} customers={customers} onDeleteCustomer={handleDeleteCustomer} />}
            {activeTab === "revenue" && <RevenueTab isLoading={isLoading} revenue={revenue} />}
            {activeTab === "maintenance" && <MaintenanceTab isLoading={isLoading} maintenanceRecords={maintenanceRecords} />}
            {activeTab === "promotions" && <PromotionsTab isLoading={isLoading} promotions={promotions} />}
            {activeTab === "staff" && <StaffTab isLoading={isLoading} staffList={staffList} onDeleteStaff={handleDeleteStaff} />}
          </section>
        </div>
      </div>

      <VehicleModal show={showVehicleModal} onClose={() => setShowVehicleModal(false)} form={vehicleForm} setForm={setVehicleForm} onSubmit={handleAddVehicle} />
      <ReturnModal show={showReturnModal} onClose={() => setShowReturnModal(false)} rental={selectedRental} form={returnForm} setForm={setReturnForm} onSubmit={handleReturnVehicle} />
      <RentModal show={showRentModal} onClose={() => setShowRentModal(false)} form={rentForm} setForm={setRentForm} onSubmit={handleCreateRental} />
      
      <ConfirmModal 
        show={confirmModal.show} 
        message={confirmModal.message} 
        onConfirm={confirmModal.onConfirm} 
        onCancel={() => setConfirmModal(prev => ({ ...prev, show: false }))} 
      />

    </main>
  );
};

export default Dashboard;
