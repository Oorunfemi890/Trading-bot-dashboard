// FILE: src/components/features/ea/EAInstructions.tsx
// =============================================
// Detailed EA Installation Instructions
// =============================================

import { Card } from '@/components/common/Card/Card';
import { Monitor, Smartphone, Download, Copy, Settings, Play } from 'lucide-react';

export function EAInstructions() {
  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-bold">Complete Installation Guide</h3>

        {/* Desktop Installation */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-5 w-5 text-blue-600" />
            <h4 className="text-lg font-semibold">For Desktop/Laptop Users</h4>
          </div>
          
          <ol className="space-y-4 pl-6">
            <li className="relative">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <h5 className="font-medium">Download MetaTrader 4/5</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download and install MT4 or MT5 from your broker's website
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <h5 className="font-medium">Download EA File</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the "Download EA" button above to get TradingBotEA.ex4 (or .ex5 for MT5)
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <h5 className="font-medium">Install EA in MetaTrader</h5>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                    <p>1. Open MetaTrader</p>
                    <p>2. File → Open Data Folder</p>
                    <p>3. Navigate to MQL4/Experts (or MQL5/Experts for MT5)</p>
                    <p>4. Copy TradingBotEA.ex4 into this folder</p>
                    <p>5. Restart MetaTrader</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  4
                </div>
                <div>
                  <h5 className="font-medium">Configure EA</h5>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                    <p>1. In MetaTrader, drag the EA onto any chart</p>
                    <p>2. In the EA settings popup:</p>
                    <div className="pl-4 space-y-1">
                      <p>• API URL: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">https://your-api-url.com</code></p>
                      <p>• API Token: [Paste your generated token]</p>
                      <p>• Poll Interval: 5 seconds (default)</p>
                    </div>
                    <p>3. Click "Allow AutoTrading" checkbox</p>
                    <p>4. Click OK</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  5
                </div>
                <div>
                  <h5 className="font-medium">Enable AutoTrading</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the "AutoTrading" button in MT4/MT5 toolbar (should turn green)
                  </p>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              ✅ Setup Complete! The EA will now automatically execute trades from signals.
            </p>
          </div>
        </div>

        {/* Mobile/VPS Installation */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="h-5 w-5 text-purple-600" />
            <h4 className="text-lg font-semibold">For Mobile Users (VPS Required)</h4>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ℹ️ MT4/MT5 mobile apps don't support EAs. You need a VPS (Virtual Private Server) to run the EA 24/7.
            </p>
          </div>

          <ol className="space-y-4 pl-6">
            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <h5 className="font-medium">Get a VPS</h5>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                    <p><strong>Option A:</strong> Check if your broker offers free VPS (many do for deposits $1,000+)</p>
                    <p><strong>Option B:</strong> Rent a VPS ($5-10/month):</p>
                    <ul className="pl-4 list-disc">
                      <li>Vultr.com - $6/month</li>
                      <li>ForexVPS.net - $10/month</li>
                      <li>Contabo.com - $5/month</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <h5 className="font-medium">Connect to VPS from Phone</h5>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                    <p><strong>iPhone:</strong> Download "Microsoft Remote Desktop"</p>
                    <p><strong>Android:</strong> Download "RD Client"</p>
                    <p>Enter your VPS IP address and password to connect</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <h5 className="font-medium">Install MT4/MT5 on VPS</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Inside the VPS, download and install MT4/MT5 from your broker
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                  4
                </div>
                <div>
                  <h5 className="font-medium">Follow Desktop Steps</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete the installation steps above (2-5) inside your VPS
                  </p>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Once set up, you can disconnect from the VPS. The EA runs 24/7 in the cloud.
              Monitor trades from your phone using the MT4/MT5 mobile app or this dashboard.
            </p>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold mb-4">Common Issues</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-red-600 dark:text-red-400">❌ EA shows sad face</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AutoTrading is disabled. Click the "AutoTrading" button in MT4/MT5 toolbar.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-red-600 dark:text-red-400">❌ No trades executing</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check: (1) EA is running (smiley face), (2) Token is correct, (3) Trading enabled in settings, (4) Internet connection
              </p>
            </div>
            <div>
              <h5 className="font-medium text-red-600 dark:text-red-400">❌ Connection error</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verify API URL is correct and your internet is working. Check EA logs in MT4/MT5 Experts tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}