# Telegram Trading Bot - Dashboard Project Structure

```
dashboard/
├── public/
│   ├── favicon.ico
│   ├── logo-light.svg
│   ├── logo-dark.svg
│   └── index.html
│
├── src/
│   ├── main.tsx                      # App entry point
│   ├── App.tsx                       # Main app component
│   ├── index.css                     # Global styles + Tailwind
│   │
│   ├── config/
│   │   ├── api.config.ts            # API base URLs and endpoints
│   │   ├── theme.config.ts          # Theme configuration
│   │   ├── routes.config.ts         # Route definitions
│   │   └── constants.ts             # App constants
│   │
│   ├── types/
│   │   ├── index.ts                 # Re-export all types
│   │   ├── auth.types.ts            # Auth types
│   │   ├── user.types.ts            # User types
│   │   ├── trade.types.ts           # Trade types
│   │   ├── signal.types.ts          # Signal types
│   │   ├── invitation.types.ts      # Invitation types
│   │   ├── analytics.types.ts       # Analytics types
│   │   └── api.types.ts             # API response types
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── index.ts             # API service aggregator
│   │   │   ├── base.service.ts      # Base API service (axios instance)
│   │   │   ├── auth.service.ts      # Auth API calls
│   │   │   ├── user.service.ts      # User API calls
│   │   │   ├── trade.service.ts     # Trade API calls
│   │   │   ├── signal.service.ts    # Signal API calls
│   │   │   ├── channel.service.ts   # Channel API calls
│   │   │   ├── invitation.service.ts # Invitation API calls
│   │   │   ├── analytics.service.ts # Analytics API calls
│   │   │   └── admin.service.ts     # Admin API calls
│   │   │
│   │   ├── websocket/
│   │   │   ├── socket.service.ts    # WebSocket connection
│   │   │   └── socket.handlers.ts   # WebSocket event handlers
│   │   │
│   │   ├── storage/
│   │   │   ├── local-storage.ts     # LocalStorage wrapper
│   │   │   └── token.service.ts     # Token management
│   │   │
│   │   └── theme/
│   │       └── theme.service.ts     # Theme management
│   │
│   ├── hooks/
│   │   ├── index.ts                 # Re-export all hooks
│   │   ├── useAuth.ts               # Auth state and actions
│   │   ├── useTheme.ts              # Theme management
│   │   ├── useWebSocket.ts          # WebSocket connection
│   │   ├── useApi.ts                # API calls wrapper
│   │   ├── useTrades.ts             # Trade operations
│   │   ├── useSignals.ts            # Signal operations
│   │   ├── useChannels.ts           # Channel operations
│   │   ├── useInvitations.ts        # Invitation operations
│   │   ├── useAnalytics.ts          # Analytics data
│   │   ├── useUsers.ts              # User management (admin)
│   │   ├── useNotifications.ts      # Notifications
│   │   ├── useModal.ts              # Modal state
│   │   ├── useToast.ts              # Toast notifications
│   │   └── usePagination.ts         # Pagination logic
│   │
│   ├── context/
│   │   ├── AuthContext.tsx          # Auth context provider
│   │   ├── ThemeContext.tsx         # Theme context provider
│   │   ├── WebSocketContext.tsx     # WebSocket context
│   │   ├── NotificationContext.tsx  # Notification context
│   │   └── ModalContext.tsx         # Modal context
│   │
│   ├── utils/
│   │   ├── index.ts                 # Re-export all utils
│   │   ├── format.util.ts           # Formatting functions
│   │   ├── date.util.ts             # Date utilities
│   │   ├── validation.util.ts       # Form validation
│   │   ├── storage.util.ts          # Storage helpers
│   │   ├── error.util.ts            # Error handling
│   │   ├── auth.util.ts             # Auth helpers
│   │   ├── trade.util.ts            # Trade calculations
│   │   └── chart.util.ts            # Chart helpers
│   │
│   ├── lib/
│   │   ├── axios.ts                 # Axios instance configuration
│   │   └── cn.ts                    # Class name utility (clsx + tailwind-merge)
│   │
│   ├── components/
│   │   ├── common/                  # Shared components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   │   ├── Select.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Table/
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── TableHeader.tsx
│   │   │   │   ├── TableBody.tsx
│   │   │   │   ├── TableRow.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Tabs/
│   │   │   │   ├── Tabs.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Dropdown/
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Toast/
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── ToastContainer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Loader/
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── EmptyState/
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ThemeToggle/
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DatePicker/
│   │   │   │   ├── DatePicker.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Chart/
│   │   │   │   ├── LineChart.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarItem.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── UserMenu.tsx
│   │   │   │   ├── NotificationBell.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── features/                # Feature-specific components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── InvitationCodeInput.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── trades/
│   │   │   │   ├── TradeCard.tsx
│   │   │   │   ├── TradeList.tsx
│   │   │   │   ├── TradeDetails.tsx
│   │   │   │   ├── PositionCard.tsx
│   │   │   │   ├── TradeFilters.tsx
│   │   │   │   ├── TradeStats.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── signals/
│   │   │   │   ├── SignalCard.tsx
│   │   │   │   ├── SignalList.tsx
│   │   │   │   ├── SignalDetails.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── channels/
│   │   │   │   ├── ChannelCard.tsx
│   │   │   │   ├── ChannelList.tsx
│   │   │   │   ├── ChannelSubscription.tsx
│   │   │   │   ├── ChannelPerformance.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── PerformanceChart.tsx
│   │   │   │   ├── RecentTrades.tsx
│   │   │   │   ├── ActiveTrades.tsx
│   │   │   │   ├── QuickActions.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── settings/
│   │   │   │   ├── ProfileSettings.tsx
│   │   │   │   ├── RiskManagement.tsx
│   │   │   │   ├── TradingSettings.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   ├── TradingAccountForm.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── notifications/
│   │   │       ├── NotificationList.tsx
│   │   │       ├── NotificationItem.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── user/                    # USER PORTAL
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── TradesPage.tsx
│   │   │   ├── TradeDetailsPage.tsx
│   │   │   ├── SignalsPage.tsx
│   │   │   ├── ChannelsPage.tsx
│   │   │   ├── PerformancePage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── NotificationsPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── admin/                   # ADMIN PORTAL
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── invitations/
│   │   │   │   ├── InvitationsPage.tsx
│   │   │   │   ├── CreateInvitationPage.tsx
│   │   │   │   ├── InvitationDetailsPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── users/
│   │   │   │   ├── UsersPage.tsx
│   │   │   │   ├── UserDetailsPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── analytics/
│   │   │   │   ├── AnalyticsPage.tsx
│   │   │   │   ├── PerformancePage.tsx
│   │   │   │   ├── RevenuePage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── system/
│   │   │   │   ├── SystemHealthPage.tsx
│   │   │   │   ├── QueuesPage.tsx
│   │   │   │   ├── MetricsPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── channels/
│   │   │   │   ├── ChannelsManagementPage.tsx
│   │   │   │   ├── AddChannelPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── audit/
│   │   │   │   ├── AuditLogsPage.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── NotFoundPage.tsx
│   │   ├── UnauthorizedPage.tsx
│   │   └── index.ts
│   │
│   ├── routes/
│   │   ├── index.tsx                # Route configuration
│   │   ├── ProtectedRoute.tsx       # Protected route wrapper
│   │   ├── AdminRoute.tsx           # Admin-only route wrapper
│   │   ├── GuestRoute.tsx           # Guest-only route wrapper
│   │   └── RouteGuard.tsx           # Route guard logic
│   │
│   ├── store/                       # State management (optional - using Zustand)
│   │   ├── index.ts
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   ├── notificationStore.ts
│   │   └── modalStore.ts
│   │
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── .env.example
├── .env.development
├── .env.production
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## 🎯 Key Architectural Decisions

### 1. **Separation of Concerns**
- One file = one responsibility
- Clear folder structure for features
- Separated admin and user pages/components

### 2. **Type Safety**
- Comprehensive TypeScript types
- Shared types between frontend and backend
- Type-safe API calls

### 3. **Service Layer**
- All API calls in dedicated services
- Consistent error handling
- Request/response transformation

### 4. **Context + Hooks Pattern**
- Context for global state (Auth, Theme, WebSocket)
- Custom hooks for business logic
- Reusable hooks for common operations

### 5. **Component Architecture**
- Common components (shared UI)
- Feature components (specific features)
- Layout components (structure)
- Page components (routes)

### 6. **Theme System**
- Dark/Light/System modes
- Tailwind CSS for styling
- CSS variables for theming
- Lucide React for icons

### 7. **Real-time Updates**
- WebSocket integration
- Live trade updates
- Real-time notifications
- Admin metrics streaming

---

## 📝 Next Steps

Now I'll start implementing **PHASE 13 - ADMIN DASHBOARD** with all files and complete code.

Ready to proceed?