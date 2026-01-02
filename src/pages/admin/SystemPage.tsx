// ===================================================
// FILE: src/pages/admin/SystemPage.tsx (FIXED)
// ===================================================
import { useEffect, useState } from 'react';
import { Database, Activity, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { adminService } from '@/services/api';
import { toast } from 'sonner';
import { Spinner } from '@/components/common/Spinner/Spinner';
import type { SystemMetrics, QueueStatistics } from '@/types';

export default function SystemPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [queues, setQueues] = useState<QueueStatistics | null>(null);

  useEffect(() => {
    loadSystemData();
    const interval = setInterval(loadSystemData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  async function loadSystemData() {
    try {
      const [metricsData, queuesData] = await Promise.all([
        adminService.getSystemMetrics(),
        adminService.getQueueStatistics(),
      ]);

      setMetrics(metricsData);
      setQueues(queuesData);
      setLoading(false);
    } catch (error) {
      if (loading) toast.error('Failed to load system data');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">System Health</h1>
        <p className="text-muted-foreground">
          Monitor system performance and infrastructure
        </p>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Database */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Database</CardTitle>
              <Database className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Status</span>
              <Badge
                variant={metrics?.system.database.connected ? 'success' : 'destructive'}
              >
                {metrics?.system.database.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Response Time</span>
              <span className="font-medium">
                {metrics?.system.database.responseTime ?? 0}ms
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Redis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Redis</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Status</span>
              <Badge
                variant={metrics?.system.redis.connected ? 'success' : 'destructive'}
              >
                {metrics?.system.redis.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Memory</span>
              <span className="font-medium">
                {metrics?.system.redis.memory?.toFixed(0) ?? 'N/A'} MB
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Server */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Server</CardTitle>
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Uptime</span>
              <span className="font-medium">
                {Math.floor((metrics?.system.uptime ?? 0) / 3600)}h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Memory</span>
              <span className="font-medium">
                {metrics?.system.memory.used ?? 0}MB /{' '}
                {metrics?.system.memory.total ?? 0}MB
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {queues?.available ? (
            <div className="space-y-4">
              {Object.entries(queues.queues || {}).map(([name, stats]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.total} jobs
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm text-center">
                    <div>
                      <p className="text-muted-foreground">Waiting</p>
                      <p className="font-semibold">{stats.waiting}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Active</p>
                      <p className="font-semibold text-warning">{stats.active}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-semibold text-success">{stats.completed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Failed</p>
                      <p className="font-semibold text-destructive">{stats.failed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Queue statistics unavailable</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}