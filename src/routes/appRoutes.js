import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BallotIcon from '@mui/icons-material/Ballot';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CollectionsIcon from '@mui/icons-material/Collections';
import Booking from '../pages/Booking/Booking';
import ProductDetails from '../pages/Product/ProductDetails';
import IncentivePageLayout from '../pages/Incentive/IncentivePageLayout';
import CheckedIncentive from '../pages/Incentive/CheckedIncentive';
import UnCheckedIncentive from '../pages/Incentive/UnCheckedIncentive';
import Partner from '../pages/Partner/Partner';
import { Report } from '../pages/Report/Report';
import CategoryIcon from '@mui/icons-material/Category';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Coupons from '../pages/Coupons/Coupons';
import FAQ from '../pages/FAQ/FAQ';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import VirtualConsulations from '../pages/VirtualConsultations/VirtualConsultations';
import FeedIcon from '@mui/icons-material/Feed';
import UserList from '../pages/Users/UserList';
import HubIcon from '@mui/icons-material/Hub';
import CenterListing from '../pages/Center/CenterListing';
import MachineListing from '../pages/Machine/MachineListing';
import TherapistList from '../pages/Therapist/TherapistList';
import RequestList from '../pages/Request/RequestList';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Packages from '../pages/Packages/Packages';
import AdvancePayments from '../pages/AdvancePayment/AdvancePayments';
import SchedulerTabs from '../pages/Scheduler/SchedulerTabs';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;

const appRoutes = [
  // {
  //   index: true,
  //   element:<Booking/>,
  //   state: "booking"
  // },
  {
    path: '/booking',
    element: <Booking />,
    state: 'booking',
    sidebarProps: {
      displayText: 'Booking',
      icon: <CollectionsIcon />,
    },
  },
  {
    path: '/productdetails',
    element: <ProductDetails />,
    state: 'productdetails',
    sidebarProps: {
      displayText: 'Products',
      icon: <CategoryIcon />,
    },
  },
  {
    path: '/incentive',
    element: <IncentivePageLayout />,
    state: 'incentive',
    sidebarProps: {
      displayText: 'Incentive',
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <CheckedIncentive />,
        state: 'incentive.checked',
      },
      {
        path: '/incentive/checked',
        element: <CheckedIncentive />,
        state: 'incentive.default',
        sidebarProps: {
          displayText: 'Checked Incentive',
        },
      },
      {
        path: '/incentive/uncheckedincentive',
        element: <UnCheckedIncentive />,
        state: 'incentive.uncheckedincentive',
        sidebarProps: {
          displayText: 'Unchecked Incentive',
        },
      },
    ],
  },
  {
    path: '/partner',
    element: <Partner />,
    state: 'partner',
    sidebarProps: {
      displayText: 'Our Partner',
      icon: <Diversity3Icon />,
    },
  },
  {
    path: '/report',
    element: <Report />,
    state: 'report',
    sidebarProps: {
      displayText: 'Report',
      icon: <FormatListBulletedOutlinedIcon />,
    },
  },
  {
    path: '/coupons',
    element: <Coupons />,
    state: 'coupons',
    sidebarProps: {
      displayText: 'Coupons',
      icon: <LocalActivityIcon />,
    },
  },
  role === "SUPER ADMIN" && {
    path: '/users',
    element: <UserList />,
    state: 'userList',
    sidebarProps: {
      displayText: 'Users',
      icon: <LocalActivityIcon />,
    },
  },
  {
    path: '/virtual-consultations',
    element: <VirtualConsulations />,
    state: 'Virtual',
    sidebarProps: {
      displayText: 'Virtual Consultations',
      icon: <FeedIcon />,
    },
  },
  {
    path: '/faq',
    element: <FAQ />,
    state: 'faq',
    sidebarProps: {
      displayText: 'FAQs',
      icon: <QuestionAnswerIcon />,
    },
  },
  {
    path: '/centerlist',
    element: <CenterListing />,
    state: 'centerList',
    sidebarProps: {
      displayText: 'Center',
      icon: <HubIcon />,
    },
  },
  {
    path: '/machinelist',
    element: <MachineListing />,
    state: 'MachineList',
    sidebarProps: {
      displayText: 'Machine',
      icon: <FeedIcon />,
    },
  },
  {
    path: '/therapistlist',
    element: <TherapistList />,
    state: 'TherapistList',
    sidebarProps: {
      displayText: 'Therapist',
      icon: <LocalHospitalIcon />,
    },
  },
  {
    path: '/allrequestlist',
    element: <RequestList />,
    state: 'dashboardRequest',
    sidebarProps: {
      displayText: 'All Request',
      icon: <RequestPageIcon />,
    },
  },
  {
    path: '/scheduler-analytics',
    element: <SchedulerTabs />,
    state: 'schedulerAnalytics',
    sidebarProps: {
      displayText: 'Scheduler Analytics',
      icon: <AnalyticsIcon />,
    },
  },
  {
    path: '/packages',
    element: <Packages />,
    state: 'packages',
    sidebarProps: {
      displayText: 'Packages',
      icon: <BallotIcon />,
    },
  },
  {
    path: '/advance-payments',
    element: <AdvancePayments />,
    state: 'advancePayments',
    sidebarProps: {
      displayText: 'Advance Payments',
      icon: <BallotIcon />,
    },
  },
];

export default appRoutes;
