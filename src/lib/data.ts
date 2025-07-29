// src/lib/data.ts

// Data for the 4 key metric cards
export const kpiData = [
    { id: 1, title: 'Revenue', value: '₹3,542,890', growth: '+18.5%', icon: 'dollar' },
    { id: 2, title: 'Users', value: '+4,150', growth: '+12.2%', icon: 'user' },
    { id: 3, title: 'Conversions', value: '+15,820', growth: '+21.3%', icon: 'conversion' },
    { id: 4, title: 'Ad Spend', value: '₹85,500', growth: '+5.1%', icon: 'spend' },
  ];
  
  // Data for the line chart
  export const monthlyRevenue = [
    { month: 'Jan', revenue: 250000 },
    { month: 'Feb', revenue: 310000 },
    { month: 'Mar', revenue: 290000 },
    { month: 'Apr', revenue: 420000 },
    { month: 'May', revenue: 380000 },
    { month: 'Jun', revenue: 550000 },
    { month: 'Jul', revenue: 610000 },
  ];
  
  // Data for the user management table
  export const userTableData = [
    { id: 'USR001', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', role: 'Admin', lastLogin: '2025-07-29 02:10 PM', status: 'Active' },
    { id: 'USR002', name: 'Priya Patel', email: 'priya.patel@example.com', role: 'Editor', lastLogin: '2025-07-28 06:30 PM', status: 'Active' },
    { id: 'USR003', name: 'Arjun Singh', email: 'arjun.singh@example.com', role: 'Viewer', lastLogin: '2025-07-29 09:15 AM', status: 'Active' },
    { id: 'USR004', name: 'Ananya Gupta', email: 'ananya.gupta@example.com', role: 'Editor', lastLogin: '2025-07-27 11:00 AM', status: 'Inactive' },
  ];
  
  // Data for the user acquisition donut chart
  export const userAcquisition = [
      { name: 'Organic Search', value: 450, fill: '#8884d8' },
      { name: 'Social Media', value: 350, fill: '#82ca9d' },
      { name: 'Referrals', value: 250, fill: '#ffc658' },
      { name: 'Direct', value: 150, fill: '#ff8042' },
  ];
  
  // Data for the "Sales by City" bar chart
  export const salesByCityData = [
      { city: 'Mumbai', sales: 980000 },
      { city: 'Delhi', sales: 750000 },
      { city: 'Bengaluru', sales: 620000 },
      { city: 'Chennai', sales: 480000 },
      { city: 'Pune', sales: 350000 },
    ];
  
  // Data for the interactive "Recent Sales" list
  export const recentSalesData = [
      { name: 'Aarav Kumar', email: 'aarav.kumar@example.com', amount: '+₹15,000', city: 'Mumbai' },
      { name: 'Saanvi Mehta', email: 'saanvi.mehta@example.com', amount: '+₹2,500', city: 'Delhi' },
      { name: 'Advik Joshi', email: 'advik.joshi@example.com', amount: '+₹5,000', city: 'Bengaluru' },
      { name: 'Myra Reddy', email: 'myra.reddy@example.com', amount: '+₹1,200', city: 'Pune' },
      { name: 'Vihaan Iyer', email: 'vihaan.iyer@example.com', amount: '+₹8,800', city: 'Chennai' },
      { name: 'Ishaan Trivedi', email: 'ishaan.trivedi@example.com', amount: '+₹22,000', city: 'Mumbai' },
      { name: 'Kiara Sharma', email: 'kiara.sharma@example.com', amount: '+₹3,100', city: 'Delhi' },
    ];