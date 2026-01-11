// FILE: src/pages/user/HelpPage.tsx (COMPLETE)
// =============================================
// Comprehensive Interactive Help Center
// =============================================

import { useState } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import { 
  HelpCircle, Book, Video, MessageCircle, Settings, 
  PlayCircle, ChevronRight, Search, X, ExternalLink,
  Zap, Shield, TrendingUp, Bell, Smartphone, Monitor,
  DollarSign, BarChart, Users, Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  icon: any;
  description: string;
  content: string;
  navigateTo?: string;
  videoUrl?: string;
}

const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting Started Guide',
    category: 'Basics',
    icon: PlayCircle,
    description: 'Learn how to set up your account and start trading',
    navigateTo: '/settings',
    content: `# Getting Started with Trading Bot

Welcome! This guide will help you get started in just 10 minutes.

## Step 1: Complete Your Profile
- Go to Settings → Profile
- Fill in your full name, phone number, and location
- This helps us provide better support

## Step 2: Configure Risk Settings
- Navigate to Settings → Risk Management
- Set your risk per trade (recommended: 5-10%)
- Choose positions per trade (recommended: 5)
- Configure breakeven activation (recommended: 25 pips)

## Step 3: Subscribe to Signal Channels
- Go to Channels page
- Browse available signal providers
- Subscribe to channels that match your strategy

## Step 4: Download and Install EA
- Visit EA Setup page
- Generate your unique API token
- Download the EA file
- Follow installation instructions

## Step 5: Enable Trading
- In Settings, turn on "Trading Enabled"
- Make sure EA is running and shows "Online"
- You're ready to receive automated trades!

## What Happens Next?
1. Signal appears in Telegram channel
2. Our system parses the signal
3. EA receives instruction
4. Trade executes automatically on your account
5. You get notified via email/dashboard

**Estimated Setup Time:** 10-15 minutes
**Difficulty:** Easy ⭐⭐⭐⭐⭐`
  },
  {
    id: 'ea-setup',
    title: 'EA Installation Guide',
    category: 'Setup',
    icon: Monitor,
    description: 'Complete guide to installing and configuring the Expert Advisor',
    navigateTo: '/ea-setup',
    videoUrl: 'https://youtube.com/watch?v=example',
    content: `# EA Installation - Step by Step

## For Desktop/Laptop Users

### 1. Download MetaTrader
- Go to your broker's website
- Download MT4 or MT5
- Install on your computer

### 2. Generate EA Token
- Go to EA Setup page in dashboard
- Click "Generate Token"
- Enter device name (e.g., "My PC")
- Select MT4 or MT5
- Copy the token (you'll need it later)

### 3. Download EA File
- Click "Download EA" button
- Save TradingBotEA.ex4 to your computer

### 4. Install EA in MetaTrader
**Steps:**
1. Open MetaTrader
2. Click File → Open Data Folder
3. Navigate to MQL4/Experts (or MQL5/Experts)
4. Copy TradingBotEA.ex4 into this folder
5. Restart MetaTrader

### 5. Configure EA
1. In MetaTrader, drag EA onto any chart
2. In settings popup:
   - API URL: http://your-api-url.com/api/v1/ea
   - API Token: [Paste your token]
   - Poll Interval: 5 (default)
3. Check "Allow AutoTrading"
4. Click OK

### 6. Enable AutoTrading
- Click "AutoTrading" button in toolbar (turns green)
- EA should show smiley face 😊
- Check Expert tab for "EA connected" message

## For Mobile Users (VPS Required)

### Why VPS?
MT4/MT5 mobile apps don't support EAs. You need a Virtual Private Server (VPS) to run the EA 24/7.

### VPS Setup
1. **Get a VPS** ($5-10/month):
   - Vultr.com
   - ForexVPS.net
   - Contabo.com
   - OR use your broker's free VPS

2. **Connect from Phone:**
   - iPhone: Download "Microsoft Remote Desktop"
   - Android: Download "RD Client"
   - Enter VPS IP and password

3. **Install MT4/MT5 on VPS:**
   - Inside VPS, download MT4/MT5 from broker
   - Install normally

4. **Follow Desktop Steps:**
   - Complete steps 2-6 above inside the VPS

5. **Disconnect:**
   - EA runs 24/7 in cloud
   - Monitor from phone using MT4 app or dashboard

## Troubleshooting

### ❌ EA shows sad face
**Solution:** Enable AutoTrading button in MT4 toolbar

### ❌ "WebRequest error"
**Solution:** 
1. Tools → Options → Expert Advisors
2. Check "Allow WebRequest for listed URL"
3. Add your API URL
4. Restart MT4

### ❌ No trades executing
**Check:**
- EA is running (smiley face)
- Token is correct
- Trading enabled in settings
- Internet connection stable

**Need Help?** Contact support@yoursite.com`
  },
  {
    id: 'risk-management',
    title: 'Risk Management Settings',
    category: 'Trading',
    icon: Shield,
    description: 'How to configure risk settings safely',
    navigateTo: '/settings?tab=risk',
    content: `# Understanding Risk Management

## Key Settings Explained

### Balance Usage Per Trade
**What it means:** Percentage of your account you risk on each trade

**Recommendations:**
- Conservative: 1-3%
- Moderate: 5-10%
- Aggressive: 10-15%
- **Never exceed 20%**

**Example:**
- Account: $10,000
- Risk: 5%
- Amount risked: $500 per trade

### Positions Per Trade
**What it means:** Number of separate positions opened for each signal

**Why multiple positions?**
- Spread risk across different entry prices
- Take profits at different levels
- Maximize profit potential

**Recommended:** 3-10 positions

### Max Concurrent Trades
**What it means:** Maximum number of trades open at the same time

**Why limit this?**
- Prevents overexposure
- Manages margin usage
- Reduces correlation risk

**Recommended:** 3-5 concurrent trades

### Breakeven Activation
**What it means:** When price moves this many pips in profit, stop loss moves to entry (breakeven)

**Why important?**
- Protects your capital
- Locks in risk-free trades
- Increases win rate

**Recommended:** 20-30 pips

## Risk Calculator

Use our built-in calculator in Settings to see:
- Exact dollar amount risked per trade
- Margin requirements
- Potential profit/loss scenarios

**Navigate to:** Settings → Risk Management

## Best Practices

✅ Start conservative (2-5% risk)
✅ Never risk more than you can afford to lose
✅ Diversify across multiple signal channels
✅ Monitor performance weekly
✅ Adjust settings based on results

❌ Don't chase losses by increasing risk
❌ Don't risk entire account on one trade
❌ Don't disable stop losses
❌ Don't ignore margin warnings`
  },
  {
    id: 'channels',
    title: 'Managing Signal Channels',
    category: 'Channels',
    icon: Users,
    description: 'How to subscribe and request new channels',
    navigateTo: '/channels',
    content: `# Signal Channels Guide

## Subscribing to Channels

### 1. Browse Available Channels
- Go to Channels page
- See list of active signal providers
- View channel performance stats

### 2. Subscribe
- Click channel card
- Review signals history
- Click "Subscribe" button

### 3. Configure Symbols
In Settings → Trading Preferences:
- Select which symbols you want to trade
- Example: XAUUSD, EURUSD, GBPUSD
- Only signals for selected symbols will execute

## Requesting New Channels

### Can't Find Your Channel?
1. Go to Channels page
2. Click "Request New Channel"
3. Fill in channel details:
   - Channel name/link
   - Why you want it
   - What signals it provides

### What Happens Next?
1. Admin reviews request (24-48 hours)
2. Channel gets tested
3. If approved, added to platform
4. You get email notification

### Channel Performance

Each channel shows:
- Total signals sent
- Win rate
- Average profit
- Subscriber count

**Use this data to choose quality channels!**

## Managing Subscriptions

### Unsubscribe
- Go to Channels page
- Click subscribed channel
- Click "Unsubscribe"
- Confirm action

**Note:** Existing trades won't be affected

### Notifications
Configure in Settings → Notifications:
- New signal alerts
- Trade execution notifications
- Take profit/stop loss alerts`
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    category: 'Settings',
    icon: Bell,
    description: 'Configure email and push notifications',
    navigateTo: '/settings?tab=notifications',
    content: `# Notification Settings

## Email Notifications

### What You Can Get Notified About:
✅ Trade Opened - When EA executes a new trade
✅ Breakeven Activated - When SL moves to entry
✅ Take Profit Hit - When TP levels are reached
✅ Stop Loss Hit - When trade closes at SL
✅ Trade Completed - Final trade summary
✅ Daily Report - End-of-day performance summary

### Configure In Settings:
Settings → Notifications → Email Preferences

### Tips:
- Enable all for maximum control
- Disable "Trade Opened" if too many emails
- Always keep "Stop Loss" and "Take Profit" on

## Dashboard Notifications

Real-time notifications appear in:
- Top-right bell icon
- Notification panel (click bell)
- Badge shows unread count

### Types:
- 🔵 Signal Detected
- 🟢 Trade Opened
- 🟡 Breakeven Activated
- 🟢 Take Profit Hit
- 🔴 Stop Loss Hit
- ⚪ Trade Completed

## Mobile Notifications

### Using MT4/MT5 Mobile App:
1. Download MT4/MT5 app
2. Login with broker credentials
3. Enable push notifications in app settings
4. Receive alerts when:
   - Positions open/close
   - Stop loss/take profit hit
   - Margin warnings

### Using Browser Notifications:
1. Visit dashboard in browser
2. Allow notifications when prompted
3. Get real-time alerts even when tab is closed

## Daily Reports

### What's Included:
- Total trades executed
- Win/loss ratio
- Net profit/loss
- Best performing channels
- Risk metrics
- Recommendations

### Schedule:
Configure in Settings:
- Time of day (default: midnight)
- Timezone
- Enable/disable

**Navigate to:** Settings → Notifications`
  },
  {
    id: 'performance',
    title: 'Understanding Performance Metrics',
    category: 'Analytics',
    icon: BarChart,
    description: 'How to read and analyze your trading stats',
    navigateTo: '/performance',
    content: `# Performance Metrics Explained

## Key Metrics

### Win Rate
**Formula:** (Winning Trades / Total Trades) × 100

**What's Good:**
- 50-60%: Good
- 60-70%: Very Good
- 70%+: Excellent

**Note:** Higher isn't always better if average loss > average win

### Profit Factor
**Formula:** Gross Profit / Gross Loss

**What's Good:**
- 1.0 = Break even
- 1.5 = Good
- 2.0+ = Excellent
- 3.0+ = Outstanding

**Example:**
- Gross Profit: $3,000
- Gross Loss: $1,000
- Profit Factor: 3.0

### Return on Risk (ROR)
**Formula:** (Net Profit / Total Risk) × 100

**What it means:** How much you earned vs how much you risked

**Example:**
- Net Profit: $500
- Total Risk: $1,000
- ROR: 50%

### Average Win vs Average Loss
**Good Ratio:** 2:1 or better

**Example:**
- Average Win: $100
- Average Loss: $50
- Ratio: 2:1 ✅

### Expectancy
**Formula:** (Win Rate × Avg Win) - (Loss Rate × Avg Loss)

**What it means:** Expected profit per trade

**Positive expectancy = Profitable strategy**

## Viewing Your Stats

### Dashboard
- Quick overview of key metrics
- Today's performance
- Recent trades

### Trades Page
**Full Analytics:**
- Detailed trade history
- Profit/loss charts
- Channel performance breakdown
- Symbol-wise analysis

**Navigate to:** Trades → Statistics

### Daily Reports
Emailed every day with:
- Complete performance summary
- Trends and insights
- Recommendations

## Improving Performance

### If Win Rate < 50%:
- Review signal channels
- Consider unsubscribing from poor performers
- Check if you're following risk management

### If Profit Factor < 1.5:
- Analyze losing trades
- Consider tighter stop losses
- Review take profit levels

### If ROR is Negative:
- Reduce risk per trade
- Unsubscribe from losing channels
- Take a break and review strategy

**Pro Tip:** Track metrics weekly and adjust monthly`
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting Common Issues',
    category: 'Support',
    icon: HelpCircle,
    description: 'Solutions to frequently encountered problems',
    content: `# Common Issues & Solutions

## EA Issues

### ❌ EA Shows Sad Face
**Problem:** AutoTrading is disabled

**Solution:**
1. Click "AutoTrading" button in MT4 toolbar
2. Button should turn green
3. EA should show smiley face 😊

### ❌ "WebRequest Error"
**Problem:** URL not allowed in MT4 settings

**Solution:**
1. Tools → Options → Expert Advisors
2. Check "Allow WebRequest for listed URL"
3. Add: http://your-api-url.com
4. Restart MT4

### ❌ No Trades Executing
**Check These:**

1. **EA Running?**
   - Smiley face visible on chart
   - Check Expert tab for errors

2. **Token Correct?**
   - Verify token in EA settings
   - Check EA Setup page for active tokens

3. **Trading Enabled?**
   - Settings → Trading Preferences
   - "Automated Trading" should be ON

4. **Signal Channels Subscribed?**
   - Channels page
   - At least one channel subscribed

5. **Symbols Allowed?**
   - Settings → Trading Preferences
   - Allowed Symbols list not empty

### ❌ Connection Issues
**Solutions:**
- Check internet connection
- Verify API URL is correct
- Restart MT4
- Re-paste token

## Dashboard Issues

### Can't Login
1. **Check Email/Password:**
   - Use "Forgot Password" if needed

2. **Account Suspended?**
   - Contact support

3. **Browser Cache:**
   - Clear cache and cookies
   - Try incognito mode

### EA Shows "Offline"
**Wait 2 minutes** - Status updates every 30s

**Still offline?**
1. Check if EA is running in MT4
2. Look for errors in Expert tab
3. Re-paste token in EA settings

### Trades Not Showing
**Wait 30 seconds** for sync

**Still missing?**
1. Refresh page
2. Check Trades page
3. Verify EA reported execution (Expert tab logs)

## Account Issues

### Subscription Expired
**Solution:**
1. Go to Profile page
2. View subscription status
3. Contact admin for renewal

### Can't Change Settings
**Check:**
- Not during active trades
- Subscription is active
- No pending changes

### Email Notifications Not Arriving
1. **Check spam folder**
2. **Whitelist:** support@yoursite.com
3. **Settings:** Notifications → Enable Email
4. **Still issues?** Contact support

## Performance Issues

### Low Win Rate
**Review:**
- Signal channel quality
- Risk management settings
- Breakeven activation too early?

### Frequent Stop Losses
**Consider:**
- Signals might be poor quality
- Stop loss too tight
- Market volatility high
- Unsubscribe from losing channels

### EA Using Too Much Margin
**Solutions:**
- Reduce positions per trade
- Lower risk percentage
- Increase max concurrent trades limit

## Getting Help

### Still Need Help?

**Option 1: Email Support**
📧 support@yoursite.com
Response time: 24-48 hours

**Option 2: Live Chat**
💬 Click chat icon (bottom right)
Available: Mon-Fri 9AM-5PM

**Option 3: Video Tutorials**
🎥 Visit Help page → Video Tutorials

**Option 4: Community**
👥 Join our Telegram support group
Link in dashboard footer

### When Contacting Support, Include:
- Account email
- Screenshot of issue
- MT4 Expert tab logs
- What you've tried already`
  },
  {
    id: 'pricing',
    title: 'Subscription Plans & Pricing',
    category: 'Billing',
    icon: DollarSign,
    description: 'Understanding subscription tiers and features',
    content: `# Subscription Plans

## Available Tiers

### FREE
**Price:** $0/month
**Features:**
- 1 concurrent trade
- 3 positions per trade
- 2 channel subscriptions
- Basic email notifications

**Best For:** Testing the platform

### STARTER
**Price:** $29/month
**Features:**
- 3 concurrent trades
- 5 positions per trade
- 5 channel subscriptions
- All notifications
- Email support

**Best For:** Beginner traders

### PRO
**Price:** $79/month
**Features:**
- 5 concurrent trades
- 10 positions per trade
- Unlimited channel subscriptions
- Priority email support
- Daily performance reports
- Advanced analytics

**Best For:** Serious traders

### ENTERPRISE
**Price:** $199/month
**Features:**
- 10 concurrent trades
- 20 positions per trade
- Unlimited everything
- 24/7 priority support
- Custom risk settings
- API access
- Dedicated account manager

**Best For:** Professional traders

## How to Upgrade

1. Contact admin via email
2. Request tier upgrade
3. Receive payment instructions
4. Account upgraded within 24h

## Payment Methods

- Bank Transfer
- Crypto (BTC, USDT)
- PayPal
- Credit Card (via Stripe)

## Refund Policy

- 7-day money back guarantee
- Full refund if not satisfied
- Contact: billing@yoursite.com

## Subscription Management

**View Current Plan:**
Profile → Subscription Details

**Renewal:**
Auto-renews unless cancelled

**Cancellation:**
Email support before renewal date

**Downgrade:**
Available anytime, effective next billing cycle`
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Filter articles based on search
  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group articles by category
  const categories = Array.from(new Set(filteredArticles.map(a => a.category)));

  const openArticle = (article: HelpArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    closeModal();
  };

  // Render markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Headings
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      
      // Bold
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold mt-3">{line.replace(/\*\*/g, '')}</p>;
      }
      
      // List items
      if (line.startsWith('- ')) {
        return <li key={i} className="ml-6 list-disc">{line.substring(2)}</li>;
      }
      
      // Numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
      if (numberedMatch) {
        return <li key={i} className="ml-6 list-decimal">{numberedMatch[2]}</li>;
      }
      
      // Checkmarks and X marks
      if (line.startsWith('✅')) {
        return <p key={i} className="text-green-600 dark:text-green-400 mt-2">{line}</p>;
      }
      if (line.startsWith('❌')) {
        return <p key={i} className="text-red-600 dark:text-red-400 mt-2">{line}</p>;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={i} className="h-4" />;
      }
      
      // Regular paragraphs
      return <p key={i} className="mt-2">{line}</p>;
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
            <HelpCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Help Center</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about using the Trading Bot platform
        </p>
      </div>

      {/* Search Bar */}
      <Card className="max-w-2xl mx-auto">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/ea-setup')}>
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <Monitor className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">EA Setup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Install & configure EA</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/settings')}>
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Settings Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Configure your account</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/channels')}>
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Channels</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage subscriptions</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Contact Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get help from our team</p>
          </div>
        </Card>
      </div>

      {/* Help Articles by Category */}
      {categories.map(category => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="blue">{category}</Badge>
            <h2 className="text-xl font-bold">{category}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles
              .filter(article => article.category === category)
              .map(article => (
                <Card
                  key={article.id}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => openArticle(article)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                          <article.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {article.description}
                    </p>
                    {article.videoUrl && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                        <Video className="h-4 w-4" />
                        <span>Video available</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try different keywords or browse all categories
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        </Card>
      )}

      {/* Modal for Article Content */}
      {showModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <selectedArticle.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedArticle.description}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedArticle.videoUrl && (
                <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Video Tutorial</p>
                    <a
                      href={selectedArticle.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center justify-center gap-1 mt-2"
                    >
                      Watch on YouTube <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                {renderContent(selectedArticle.content)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t dark:border-gray-800 p-6 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              {selectedArticle.navigateTo && (
                <Button
                  variant="primary"
                  onClick={() => navigateToPage(selectedArticle.navigateTo!)}
                  leftIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Go to Page
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}