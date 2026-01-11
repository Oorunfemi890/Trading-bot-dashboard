// FILE: src/pages/user/EASetupPage.tsx
// =============================================
// EA Setup & Management Page
// =============================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { 
  Download, Copy, CheckCircle, XCircle, AlertCircle, 
  Monitor, Smartphone, RefreshCw, Trash2, Plus, Activity 
} from 'lucide-react';
import { useEA } from '@/hooks/useEA';
import { EAInstructions } from '@/components/features/ea/EAInstructions';

export default function EASetupPage() {
  const { 
    tokens, 
    status, 
    isLoading, 
    generateToken, 
    revokeToken, 
    refreshStatus 
  } = useEA();

  const [deviceName, setDeviceName] = useState('');
  const [platform, setPlatform] = useState<'MT4' | 'MT5'>('MT5');
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshStatus();
    }, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  const handleGenerateToken = async () => {
    if (!deviceName.trim()) {
      alert('Please enter a device name');
      return;
    }

    const result = await generateToken(deviceName, platform);
    if (result?.token) {
      setGeneratedToken(result.token);
      setDeviceName('');
      setShowInstructions(true);
    }
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleRevokeToken = async (tokenId: string) => {
    if (confirm('Are you sure you want to revoke this token? The EA will stop working.')) {
      await revokeToken(tokenId);
    }
  };

  const downloadEA = () => {
    // In production, this would download the actual EA file
    alert('EA download will be available soon. Please contact support for the EA file.');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">EA Setup & Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Download and configure your Expert Advisor for automated trading
        </p>
      </div>

      {/* Connection Status */}
      <Card className={`border-2 ${
        status?.connected 
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-300 dark:border-gray-700'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                status?.connected 
                  ? 'bg-green-600' 
                  : 'bg-gray-400'
              }`}>
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  EA Connection Status
                  {status?.connected ? (
                    <Badge variant="success">Online</Badge>
                  ) : (
                    <Badge variant="gray">Offline</Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {status?.connected 
                    ? `Last ping: ${new Date(status.lastPing!).toLocaleString()}`
                    : 'EA not connected'
                  }
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={refreshStatus}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Refresh
            </Button>
          </div>

          {status?.connected && status.accountInfo && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Broker</p>
                <p className="text-lg font-semibold">{status.accountInfo.broker || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Account</p>
                <p className="text-lg font-semibold">{status.accountInfo.accountNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
                <p className="text-lg font-semibold">${status.accountInfo.balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Open Positions</p>
                <p className="text-lg font-semibold">{status.accountInfo.openPositions}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Start Guide</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium">Download EA</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download the Expert Advisor file
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium">Generate Token</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create an API token for your EA
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium">Install & Configure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Install EA and paste your token
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              variant="primary"
              onClick={downloadEA}
              leftIcon={<Download className="h-4 w-4" />}
            >
              Download EA
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? 'Hide' : 'Show'} Full Instructions
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      {showInstructions && <EAInstructions />}

      {/* Generate New Token */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Generate New EA Token</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="Device Name"
              placeholder="e.g., My Desktop PC"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as 'MT4' | 'MT5')}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="MT4">MetaTrader 4</option>
                <option value="MT5">MetaTrader 5</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="primary"
                onClick={handleGenerateToken}
                fullWidth
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Generate Token
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* New Token Display */}
      {generatedToken && (
        <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Token Generated Successfully!</h3>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-800 p-4 border">
              <div className="flex items-center justify-between gap-4">
                <code className="text-sm font-mono break-all">{generatedToken}</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyToken(generatedToken)}
                  leftIcon={<Copy className="h-4 w-4" />}
                >
                  {copiedToken === generatedToken ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-4 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>
                Save this token securely! You won't be able to see it again. 
                Paste it into your EA configuration.
              </span>
            </p>
          </div>
        </Card>
      )}

      {/* Active Tokens */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your EA Tokens</h3>
            <Badge variant="blue">{tokens?.length || 0} Active</Badge>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : tokens && tokens.length > 0 ? (
            <div className="space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      {token.platform === 'MT4' ? (
                        <Monitor className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{token.deviceName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={token.status === 'active' ? 'success' : 'gray'}>
                          {token.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {token.platform || 'Unknown Platform'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Last used: {token.lastUsedAt 
                          ? new Date(token.lastUsedAt).toLocaleString()
                          : 'Never'
                        } • {token.requestCount} requests
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeToken(token.id)}
                    leftIcon={<Trash2 className="h-4 w-4" />}
                  >
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <XCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No active tokens</p>
              <p className="text-sm">Generate a token to get started</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}