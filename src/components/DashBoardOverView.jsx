"use client";

import {
  CreditCard,
  IndianRupee,
  ListOrdered,
  ListOrderedIcon,
  ReceiptIndianRupeeIcon,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PiChart from "./PiChart";
import OrderRecently from "./OrderRecently";

function DashBoardOverView({ Allorders, user }) {
  // Handle empty or undefined Allorders
  const orders = Allorders || [];
  console.log("allorders", orders);
  const now = new Date();
  console.log(now);
  const TodaySales = orders.filter(
    (item) => new Date(item.createdAt).toDateString() === now.toDateString()
  );
  const date = orders.map((item) => new Date(item.createdAt).toDateString());
  console.log(date);
  const YesterDaySales = orders.filter(
    (item) =>
      new Date(item.createdAt).toDateString() ===
      new Date(now.setDate(now.getDate() - 1)).toDateString()
  );
  const toIST = (date) =>
    new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  const MonthSales = orders.filter((item) => {
    const orderDate = toIST(new Date(item.createdAt));
    const nowIST = toIST(new Date());
    return (
      orderDate.getMonth() === nowIST.getMonth() &&
      orderDate.getFullYear() === nowIST.getFullYear()
    );
  });
  console.log("monthSales", MonthSales);
  const LastMonthSales = orders.filter((item) => {
    const orderDate = toIST(new Date(item.createdAt));
    const nowDate = toIST(new Date());
    let month = nowDate.getMonth() - 1;
    let year = nowDate.getFullYear();
    if (month < 0) {
      month = 11;
      year = year - 1;
    }
    return orderDate.getMonth() === month && orderDate.getFullYear() === year;
  });
  console.log("lastMonthSales", LastMonthSales);
  const AllTimesSales = orders.filter((item) => {
    return true;
  });
  console.log("AllTimesSales", AllTimesSales);
  const AllTimePrice = AllTimesSales.reduce((total, order) => {
    return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
  }, 0);
  console.log("AllTimePrice", AllTimePrice);

  const lastMonthPrice = LastMonthSales.reduce((total, order) => {
    return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
  }, 0);
  console.log(lastMonthPrice);

  const TheseMonthSalesPrice = MonthSales.reduce((total, order) => {
    return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
  }, 0);
  const TodaySalesPrice = TodaySales.reduce((total, order) => {
    return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
  }, 0);

  const YesterDaySalesPrice = YesterDaySales.reduce((total, order) => {
    return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
  }, 0);

  // Calculate weekly sales data for the line chart
  const getWeeklySalesData = () => {
    const weeklyData = [];
    const today = toIST(new Date());

    // Get data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();

      const dayOrders = orders.filter(
        (order) => new Date(order.createdAt).toDateString() === dateString
      );

      const dailySales = dayOrders.reduce((total, order) => {
        return total + (order.items?.reduce((sum, item) => sum + item.price, 0) || 0);
      }, 0);

      weeklyData.push({
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        sales: dailySales,
        orders: dayOrders.length,
      });
    }

    return weeklyData;
  };

  const weeklyData = getWeeklySalesData();

  const ProductSales = orders.reduce((total, order) => {
    order.items?.forEach((item) => {
      if (!total[item.productId]) {
        total[item.productId] = {
          title: item.title,
          count: 0,
          totalPrice: 0,
          price: 0,
        };
      }
      total[item.productId].count += 1;
      total[item.productId].totalPrice = item.price * item.quantity;
      total[item.productId].price = item.price;
    });
    return total;
  }, {});
  console.log("productSales", ProductSales);

  const RecentOrder = orders.sort((a,b)=>{
    return new Date(b.createdAt) - new Date(a.createdAt);
  })
  console.log("allOrder", orders);
  console.log("recentOrder", RecentOrder);


  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">Track your business performance and key metrics</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
          <div className="relative p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <ListOrdered className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">Today's Orders</h3>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">{TodaySalesPrice.toLocaleString()}</span>
            </div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
          <div className="relative p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <ListOrdered className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">Yesterday's Orders</h3>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">{YesterDaySalesPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
          <div className="relative p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <ShoppingBasket className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">This Month</h3>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">{TheseMonthSalesPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
          <div className="relative p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">Last Month</h3>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">{lastMonthPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent"></div>
          <div className="relative p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">All Time Sales</h3>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              <span className="text-2xl font-bold">{AllTimePrice.toLocaleString()}</span>
            </div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Order Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Orders</h4>
            <h2 className="text-3xl font-bold text-card-foreground">{orders.length}</h2>
            <div className="flex items-center mt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-amber-600" />
            </div>
            <div className="w-3 h-3 bg-amber-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Order Pending</h4>
            <h2 className="text-3xl font-bold text-card-foreground">
              {orders.filter((order) => order.orderStatus === "pending").length}
            </h2>
            <div className="flex items-center mt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{
                    width: `${orders.length > 0 ? (orders.filter(order => order.orderStatus === "pending").length / orders.length) * 100 : 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="w-3 h-3 bg-purple-500 rounded-full opacity-60"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Processing</h4>
            <h2 className="text-3xl font-bold text-card-foreground">
              {orders.filter((order) => order.orderStatus === "processing").length}
            </h2>
            <div className="flex items-center mt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{
                    width: `${orders.length > 0 ? (orders.filter(order => order.orderStatus === "processing").length / orders.length) * 100 : 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full opacity-60"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Delivered</h4>
            <h2 className="text-3xl font-bold text-card-foreground">
              {orders.filter((order) => order.orderStatus === "delivered").length}
            </h2>
            <div className="flex items-center mt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full" 
                  style={{
                    width: `${orders.length > 0 ? (orders.filter(order => order.orderStatus === "delivered").length / orders.length) * 100 : 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8 mb-8">
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-muted/50 p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">
                  Weekly Sales Overview
                </h2>
                <p className="text-muted-foreground">
                  Sales performance for the last 7 days
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Sales</span>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
                <span className="text-sm text-muted-foreground">Orders</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#666" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--card-foreground))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
                    }}
                    formatter={(value, name) => [
                      name === "sales" ? `₹${value.toLocaleString()}` : value,
                      name === "sales" ? "Sales" : "Orders",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{
                      r: 8,
                      stroke: "#3b82f6",
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                    name="sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 7,
                      stroke: "#10b981",
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                    name="orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Week Sales</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{weeklyData.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-xl">
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Week Orders</p>
                <p className="text-2xl font-bold text-green-600">
                  {weeklyData.reduce((sum, day) => sum + day.orders, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                <p className="text-sm font-medium text-muted-foreground mb-1">Daily Average</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{Math.round(weeklyData.reduce((sum, day) => sum + day.sales, 0) / 7).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <PiChart ProductSales={ProductSales} />
      </div>

      {/* Recent Orders Section */}
      <OrderRecently order={RecentOrder} />
    </div>
  );
}

export default DashBoardOverView;
