// FILE: src/hooks/index.ts
// ===================================================
// FIXED: Export useAuth from context, not from hooks folder
// ===================================================

// Context hooks - these come from context providers
export { useAuth } from '../context/AuthContext';
export { useTheme } from '../context/ThemeContext';
export { useWebSocket } from '../context/WebSocketContext';
export { useNotifications } from '../context/NotificationContext';
export { useModal } from '../context/ModalContext';

// Custom hooks
export { useApi } from './useApi';
export { usePagination } from './usePagination';
export { useInvitations } from './useInvitations';
export { useUsers } from './useUsers';
export { useTrades } from './useTrades';
export { useSignals } from './useSignals';
export { useChannels } from './useChannels';
export { useAnalytics } from './useAnalytics';
export { useToast } from './useToast';
export { useEA } from './useEA';