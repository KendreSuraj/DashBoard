import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
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
];

export default appRoutes;
