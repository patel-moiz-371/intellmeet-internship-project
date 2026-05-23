import MainLayout from "../layouts/MainLayout";
import DashboardCards from "../components/DashboardCards";
import MeetingTable from "../components/MeetingTable";
import AnalyticsChart from "../components/AnalyticsChart";

const Dashboard = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Enterprise Dashboard
      </h1>

      <DashboardCards />

      <AnalyticsChart />

      <MeetingTable />

    </MainLayout>
  );
};

export default Dashboard;