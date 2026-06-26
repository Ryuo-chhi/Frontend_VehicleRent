import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { 
  HiOutlineTruck, 
  HiOutlineUserGroup, 
  HiOutlineClipboardList, 
  HiOutlineCurrencyDollar,
  HiOutlineCog,
  HiOutlineTag,
  HiOutlineUsers
} from "react-icons/hi";
import { HiOutlineSearch } from 'react-icons/hi';
import toast from "react-hot-toast";

// Import tabs
import VehiclesTab from "../components/dashboard/VehiclesTab";
import RentalsTab from "../components/dashboard/RentalsTab";
import CustomersTab from "../components/dashboard/CustomersTab";
import RevenueTab from "../components/dashboard/RevenueTab";
import MaintenanceTab from "../components/dashboard/MaintenanceTab";
import PromotionsTab from "../components/dashboard/PromotionsTab";
import StaffTab from "../components/dashboard/StaffTab";

import VehicleModal from "../components/modals/VehicleModal";
import ReturnModal from "../components/modals/ReturnModal";
import RentModal from "../components/modals/RentModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import CustomerModal from "../components/modals/CustomerModal";
import StaffModal from "../components/modals/StaffModal";
import RentalDetailsModal from "../components/modals/RentalDetailsModal";
import MaintenanceModal from "../components/modals/MaintenanceModal";
import PromotionModal from "../components/modals/PromotionModal";

const Dashboard = () => {
  const { role, login, logout } = useAuth();
  const token = localStorage.getItem("token");
  const isStaff = token && (role === "MANAGER" || role === "REGULAR" || role === "STAFF");

  const [staffUsername, setStaffUsername] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffLoginError, setStaffLoginError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
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

  const defaultVehicleForm = {
    type: "Car", powerSource: "gasoline", vehicleClass: "sedan",
    vehicleBrand: "", vehicleModel: "", rentalRatePerDay: "",
    vehicleLicence: "", licencePlate: "", numberOfSeats: "4", helmetIncluded: false
  };
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleForm, setVehicleForm] = useState(defaultVehicleForm);
  const [isEditVehicle, setIsEditVehicle] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState(null);

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({});
  const [isEditCustomer, setIsEditCustomer] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({ role: "REGULAR", status: true });
  const [isEditStaff, setIsEditStaff] = useState(false);
  const [editStaffId, setEditStaffId] = useState(null);

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

  const [showRentalDetailsModal, setShowRentalDetailsModal] = useState(false);
  const [detailedRental, setDetailedRental] = useState(null);
  const [isHistoryDetail, setIsHistoryDetail] = useState(false);

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({});
  const [isEditMaintenance, setIsEditMaintenance] = useState(false);
  const [editMaintenanceId, setEditMaintenanceId] = useState(null);

  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionForm, setPromotionForm] = useState({ active: true });
  const [isEditPromotion, setIsEditPromotion] = useState(false);
  const [editPromotionId, setEditPromotionId] = useState(null);

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
      const data = await login({ username: staffUsername, password: staffPassword }, 'staff');
      if (data.role === "MANAGER" || data.role === "REGULAR" || data.role === "STAFF") {
        window.location.reload();
      } else {
        await logout();
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
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } else if (activeTab === "customers") {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } else if (activeTab === "rentals") {
        const [active, history] = await Promise.all([
          api.get("/rentals/active"),
          api.get("/rentals/history")
        ]);
        setActiveRentals(active.data);
        setRentalHistory(history.data);
      } else if (activeTab === "revenue") {
        const rev = await api.get("/rentals/revenue");
        setRevenue(rev.data);
      } else if (activeTab === "maintenance") {
        const response = await api.get("/maintenance-records");
        setMaintenanceRecords(response.data);
      } else if (activeTab === "promotions") {
        const response = await api.get("/promotions");
        setPromotions(response.data);
      } else if (activeTab === "staff") {
        const response = await api.get("/staffs");
        setStaffList(Array.isArray(response.data) ? response.data : [...response.data]);
      }
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save Vehicle (Create or Edit)
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isEditVehicle 
        ? `/vehicles/${vehicleForm.type === "Car" ? "cars" : "motos"}/${editVehicleId}`
        : vehicleForm.type === "Car" ? "/vehicles/cars" : "/vehicles/motos";
      
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

      if (isEditVehicle) {
        await api.put(endpoint, payload);
      } else {
        await api.post(endpoint, payload);
      }
      
      setShowVehicleModal(false);
      setVehicleForm(defaultVehicleForm);
      fetchData();
      toast.success(isEditVehicle ? "Vehicle updated successfully" : "Vehicle added successfully");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(`Failed to ${isEditVehicle ? 'update' : 'add'} vehicle: ` + serverMsg);
    }
  };

  const openAddVehicle = () => {
    setIsEditVehicle(false);
    setEditVehicleId(null);
    setVehicleForm(defaultVehicleForm);
    setShowVehicleModal(true);
  };

  const openEditVehicle = (vehicle) => {
    setIsEditVehicle(true);
    setEditVehicleId(vehicle.vehicleId);
    setVehicleForm({
      type: vehicle.vehicleType,
      powerSource: vehicle.powerSource,
      vehicleClass: vehicle.vehicleClass,
      vehicleBrand: vehicle.vehicleBrand,
      vehicleModel: vehicle.vehicleModel,
      rentalRatePerDay: vehicle.rentalRatePerDay,
      vehicleLicence: vehicle.licence,
      licencePlate: vehicle.licencePlate,
      numberOfSeats: vehicle.numberOfSeats || "4",
      helmetIncluded: vehicle.helmetIncluded || false
    });
    setShowVehicleModal(true);
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (id) => {
    requestConfirm("Are you sure you want to delete this vehicle?", async () => {
      try {
        await api.delete(`/vehicles/${id}`);
        fetchData();
        toast.success("Vehicle deleted successfully");
      } catch (err) {
        const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
        toast.error("Failed to delete vehicle: " + serverMsg);
      }
    });
  };

  // Open Return Modal
  const openReturnModal = (rental) => {
    setSelectedRental(rental);
    setReturnForm({
      payDate: new Date().toISOString().split('T')[0],
      paymentMethod: "CASH",
      discount: 0,
      damageFee: 0,
      extraDays: 0
    });
    setShowReturnModal(true);
  };

  const handleViewRentalDetails = (rental, isHistory) => {
    setDetailedRental(rental);
    setIsHistoryDetail(isHistory);
    setShowRentalDetailsModal(true);
  };

  const handleNavigateToCustomer = (customer) => {
    setShowRentalDetailsModal(false);
    setActiveTab("customers");
    if (customer) {
      openEditCustomer(customer);
    }
  };

  const handleNavigateToVehicle = (vehicle) => {
    setShowRentalDetailsModal(false);
    setActiveTab("vehicles");
    if (vehicle) {
      openEditVehicle(vehicle);
    }
  };

  // Process Return
  const handleReturnVehicle = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/rentals/${selectedRental.rentId}/return`, {
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
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error("Failed to return vehicle: " + serverMsg);
    }
  };

  // Create Rental
  const handleCreateRental = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rentals', {
        vehicleId: parseInt(rentForm.vehicleId) || 0,
        customerId: parseInt(rentForm.customerId) || 0,
        staffId: parseInt(localStorage.getItem('staffId')) || 1,
        staffUsername: localStorage.getItem('username') || 'root_admin',
        rentDays: parseInt(rentForm.rentDays) || 1,
        startDate: rentForm.startDate,
        endDate: rentForm.endDate,
        deposit: parseFloat(rentForm.deposit) || 0
      });
      setShowRentModal(false);
      fetchData();
      toast.success("Rental created successfully");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error("Failed to create rental: " + serverMsg);
    }
  };
  // Save Customer (Create or Edit)
  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    try {
      if (isEditCustomer) {
        await api.put(`/customers/${editCustomerId}`, customerForm);
      } else {
        await api.post('/customers/register', customerForm);
      }
      setShowCustomerModal(false);
      setCustomerForm({});
      fetchData();
      toast.success(isEditCustomer ? "Customer updated successfully" : "Customer created successfully");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(`Failed to ${isEditCustomer ? 'update' : 'create'} customer: ` + serverMsg);
    }
  };

  const openAddCustomer = () => {
    setIsEditCustomer(false);
    setEditCustomerId(null);
    setCustomerForm({});
    setShowCustomerModal(true);
  };

  const openEditCustomer = (customer) => {
    setIsEditCustomer(true);
    setEditCustomerId(customer.customerId);
    setCustomerForm({
      customerName: customer.customerName,
      email: customer.email,
      customerPhone: customer.customerPhone,
      customerIdNum: customer.customerIdNum
    });
    setShowCustomerModal(true);
  };
  // Save Staff (Create or Edit)
  const handleSaveStaff = async (e) => {
    e.preventDefault();
    try {
      if (isEditStaff) {
        await api.put(`/staffs/${editStaffId}`, staffForm);
      } else {
        const endpoint = staffForm.role === "MANAGER" ? "/staffs/managers" : "/staffs/register";
        await api.post(endpoint, staffForm);
      }
      setShowStaffModal(false);
      setStaffForm({ role: "REGULAR", status: true });
      fetchData();
      toast.success(isEditStaff ? "Staff updated successfully" : "Staff created successfully");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(`Failed to ${isEditStaff ? 'update' : 'create'} staff: ` + serverMsg);
    }
  };

  const openAddStaff = () => {
    setIsEditStaff(false);
    setEditStaffId(null);
    setStaffForm({ role: "REGULAR", status: true });
    setShowStaffModal(true);
  };

  const openEditStaff = (staff) => {
    setIsEditStaff(true);
    setEditStaffId(staff.id);
    setStaffForm({
      name: staff.name,
      username: staff.username,
      salary: staff.salary,
      role: staff.role,
      status: staff.status,
      workStation: staff.workStation
    });
    setShowStaffModal(true);
  };
  
  // Delete Customer
  const handleDeleteCustomer = async (id) => {
    requestConfirm("Are you sure you want to delete this customer?", async () => {
      try {
        await api.delete(`/customers/${id}`);
        fetchData();
        toast.success("Customer deleted successfully");
      } catch (err) {
        const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
        toast.error("Failed to delete customer: " + serverMsg);
      }
    });
  };
  
  // Delete Staff
  const handleDeleteStaff = async (id) => {
    requestConfirm("Delete this staff member?", async () => {
      try {
        await api.delete(`/staffs/${id}`);
        fetchData();
        toast.success("Staff member deleted successfully");
      } catch (err) {
        const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
        toast.error("Failed to delete staff: " + serverMsg);
      }
    });
  };

  // Maintenance Handlers
  const handleSaveMaintenance = async (e) => {
    e.preventDefault();
    try {
      if (isEditMaintenance) {
        await api.put(`/maintenance-records/${editMaintenanceId}`, maintenanceForm);
      } else {
        await api.post('/maintenance-records', {
          vehicleId: parseInt(maintenanceForm.vehicleId),
          details: maintenanceForm.details,
          cost: parseFloat(maintenanceForm.cost),
          startDate: maintenanceForm.startDate
        });
      }
      setShowMaintenanceModal(false);
      fetchData();
      toast.success(isEditMaintenance ? "Maintenance updated" : "Maintenance created");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(`Failed to save maintenance: ` + serverMsg);
    }
  };

  const openAddMaintenance = () => {
    setIsEditMaintenance(false);
    setEditMaintenanceId(null);
    setMaintenanceForm({
      startDate: new Date().toISOString().split('T')[0],
      cost: 0
    });
    setShowMaintenanceModal(true);
  };

  const openEditMaintenance = (record) => {
    setIsEditMaintenance(true);
    setEditMaintenanceId(record.maintenanceId);
    setMaintenanceForm({ ...record });
    setShowMaintenanceModal(true);
  };

  const handleDeleteMaintenance = async (id) => {
    requestConfirm("Delete this maintenance record?", async () => {
      try {
        await api.delete(`/maintenance-records/${id}`);
        fetchData();
        toast.success("Maintenance record deleted");
      } catch (err) {
        toast.error("Failed to delete maintenance record");
      }
    });
  };

  // Promotion Handlers
  const handleSavePromotion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: promotionForm.code.toUpperCase(),
        discountPercent: parseFloat(promotionForm.discountPercent),
        active: promotionForm.active
      };
      if (isEditPromotion) {
        await api.put(`/promotions/${editPromotionId}`, payload);
      } else {
        await api.post('/promotions', payload);
      }
      setShowPromotionModal(false);
      fetchData();
      toast.success(isEditPromotion ? "Promotion updated" : "Promotion created");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(`Failed to save promotion: ` + serverMsg);
    }
  };

  const openAddPromotion = () => {
    setIsEditPromotion(false);
    setEditPromotionId(null);
    setPromotionForm({ active: true, discountPercent: 0 });
    setShowPromotionModal(true);
  };

  const openEditPromotion = (promo) => {
    setIsEditPromotion(true);
    setEditPromotionId(promo.promoId);
    setPromotionForm({ ...promo });
    setShowPromotionModal(true);
  };

  const handleDeletePromotion = async (id) => {
    requestConfirm("Delete this promotion?", async () => {
      try {
        await api.delete(`/promotions/${id}`);
        fetchData();
        toast.success("Promotion deleted");
      } catch (err) {
        toast.error("Failed to delete promotion");
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Staff Management Dashboard</h1>
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
          </div>
        </div>

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
            {activeTab === "vehicles" && <VehiclesTab isLoading={isLoading} vehicles={vehicles} onAddVehicleClick={openAddVehicle} onEditVehicle={openEditVehicle} onDeleteVehicle={handleDeleteVehicle} searchQuery={searchQuery} />}
            {activeTab === "rentals" && <RentalsTab isLoading={isLoading} activeRentals={activeRentals} rentalHistory={rentalHistory} onNewRentalClick={() => setShowRentModal(true)} onReturnClick={openReturnModal} onViewDetails={handleViewRentalDetails} searchQuery={searchQuery} />}
            {activeTab === "customers" && <CustomersTab isLoading={isLoading} customers={customers} onEditCustomer={openEditCustomer} onDeleteCustomer={handleDeleteCustomer} onAddCustomer={openAddCustomer} searchQuery={searchQuery} />}
            {activeTab === "revenue" && <RevenueTab isLoading={isLoading} revenue={revenue} rentalHistory={rentalHistory} />}
            {activeTab === "maintenance" && <MaintenanceTab isLoading={isLoading} maintenanceRecords={maintenanceRecords} onAddClick={openAddMaintenance} onEditClick={openEditMaintenance} onDeleteClick={handleDeleteMaintenance} searchQuery={searchQuery} />}
            {activeTab === "promotions" && <PromotionsTab isLoading={isLoading} promotions={promotions} onAddClick={openAddPromotion} onEditClick={openEditPromotion} onDeleteClick={handleDeletePromotion} searchQuery={searchQuery} />}
            {activeTab === "staff" && <StaffTab isLoading={isLoading} staffList={staffList} onEditStaff={openEditStaff} onDeleteStaff={handleDeleteStaff} onAddStaff={openAddStaff} searchQuery={searchQuery} />}
          </section>
        </div>
      </div>

      <VehicleModal show={showVehicleModal} onClose={() => setShowVehicleModal(false)} form={vehicleForm} setForm={setVehicleForm} onSubmit={handleSaveVehicle} isEdit={isEditVehicle} />
      <ReturnModal show={showReturnModal} onClose={() => setShowReturnModal(false)} rental={selectedRental} form={returnForm} setForm={setReturnForm} onSubmit={handleReturnVehicle} promotions={promotions} />
      <RentModal show={showRentModal} onClose={() => setShowRentModal(false)} form={rentForm} setForm={setRentForm} onSubmit={handleCreateRental} />
      <CustomerModal show={showCustomerModal} onClose={() => setShowCustomerModal(false)} form={customerForm} setForm={setCustomerForm} onSubmit={handleSaveCustomer} isEdit={isEditCustomer} />
      <StaffModal show={showStaffModal} onClose={() => setShowStaffModal(false)} form={staffForm} setForm={setStaffForm} onSubmit={handleSaveStaff} isEdit={isEditStaff} />
      <RentalDetailsModal show={showRentalDetailsModal} onClose={() => setShowRentalDetailsModal(false)} rental={detailedRental} isHistory={isHistoryDetail} onNavigateToCustomer={handleNavigateToCustomer} onNavigateToVehicle={handleNavigateToVehicle} />
      <MaintenanceModal show={showMaintenanceModal} onClose={() => setShowMaintenanceModal(false)} form={maintenanceForm} setForm={setMaintenanceForm} onSubmit={handleSaveMaintenance} isEdit={isEditMaintenance} />
      <PromotionModal show={showPromotionModal} onClose={() => setShowPromotionModal(false)} form={promotionForm} setForm={setPromotionForm} onSubmit={handleSavePromotion} isEdit={isEditPromotion} />
      
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
