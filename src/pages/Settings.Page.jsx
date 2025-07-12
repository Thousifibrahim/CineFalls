import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { 
  Settings, 
  User, 
  Bell, 
  Globe, 
  Monitor,
  Volume2,
  Download,
  Trash2,
  Key,
  Shield,
  Moon,
  Sun,
  Eye,
  Save,
  RefreshCw
} from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAdmin();
  
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    notifications: {
      newReleases: true,
      recommendations: true,
      watchlistUpdates: false,
      email: true,
      push: false
    },
    playback: {
      autoplay: true,
      quality: 'auto',
      subtitles: true,
      volume: 75
    },
    privacy: {
      profilePublic: false,
      showWatchHistory: true,
      allowRecommendations: true,
      shareViewingData: false
    },
    advanced: {
      cacheSize: '1GB',
      offlineDownloads: false,
      debugMode: false
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (section, subsection, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setHasChanges(false);
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50';
    toast.textContent = 'Settings saved successfully!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        theme: 'dark',
        language: 'en',
        notifications: {
          newReleases: true,
          recommendations: true,
          watchlistUpdates: false,
          email: true,
          push: false
        },
        playback: {
          autoplay: true,
          quality: 'auto',
          subtitles: true,
          volume: 75
        },
        privacy: {
          profilePublic: false,
          showWatchHistory: true,
          allowRecommendations: true,
          shareViewingData: false
        },
        advanced: {
          cacheSize: '1GB',
          offlineDownloads: false,
          debugMode: false
        }
      });
      setHasChanges(true);
    }
  };

  const clearUserData = () => {
    if (window.confirm('This will clear all your favorites, watchlist, and viewing history. This action cannot be undone. Are you sure?')) {
      localStorage.removeItem('favorites');
      localStorage.removeItem('watchlist');
      localStorage.removeItem('watched');
      localStorage.removeItem('userSettings');
      
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg z-50';
      toast.textContent = 'User data cleared successfully!';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'playback', name: 'Playback', icon: Monitor },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'advanced', name: 'Advanced', icon: Key }
  ];

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', '', e.target.value)}
              className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', '', e.target.value)}
              className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
        <div className="divide-y divide-gray-700">
          <ToggleSwitch
            checked={settings.notifications.newReleases}
            onChange={(value) => updateNestedSetting('notifications', 'notifications', 'newReleases', value)}
            label="New movie releases"
          />
          <ToggleSwitch
            checked={settings.notifications.recommendations}
            onChange={(value) => updateNestedSetting('notifications', 'notifications', 'recommendations', value)}
            label="Personalized recommendations"
          />
          <ToggleSwitch
            checked={settings.notifications.watchlistUpdates}
            onChange={(value) => updateNestedSetting('notifications', 'notifications', 'watchlistUpdates', value)}
            label="Watchlist updates"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Delivery Methods</h3>
        <div className="divide-y divide-gray-700">
          <ToggleSwitch
            checked={settings.notifications.email}
            onChange={(value) => updateNestedSetting('notifications', 'notifications', 'email', value)}
            label="Email notifications"
          />
          <ToggleSwitch
            checked={settings.notifications.push}
            onChange={(value) => updateNestedSetting('notifications', 'notifications', 'push', value)}
            label="Push notifications"
          />
        </div>
      </div>
    </div>
  );

  const renderPlaybackTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Video Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Default Quality
            </label>
            <select
              value={settings.playback.quality}
              onChange={(e) => updateNestedSetting('playback', 'playback', 'quality', e.target.value)}
              className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="auto">Auto</option>
              <option value="1080p">1080p HD</option>
              <option value="720p">720p HD</option>
              <option value="480p">480p</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-gray-700 mt-4">
          <ToggleSwitch
            checked={settings.playback.autoplay}
            onChange={(value) => updateNestedSetting('playback', 'playback', 'autoplay', value)}
            label="Autoplay next episode"
          />
          <ToggleSwitch
            checked={settings.playback.subtitles}
            onChange={(value) => updateNestedSetting('playback', 'playback', 'subtitles', value)}
            label="Show subtitles by default"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Audio</h3>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Default Volume: {settings.playback.volume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.playback.volume}
            onChange={(e) => updateNestedSetting('playback', 'playback', 'volume', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
        <div className="divide-y divide-gray-700">
          <ToggleSwitch
            checked={settings.privacy.profilePublic}
            onChange={(value) => updateNestedSetting('privacy', 'privacy', 'profilePublic', value)}
            label="Make profile public"
          />
          <ToggleSwitch
            checked={settings.privacy.showWatchHistory}
            onChange={(value) => updateNestedSetting('privacy', 'privacy', 'showWatchHistory', value)}
            label="Show watch history to friends"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data & Recommendations</h3>
        <div className="divide-y divide-gray-700">
          <ToggleSwitch
            checked={settings.privacy.allowRecommendations}
            onChange={(value) => updateNestedSetting('privacy', 'privacy', 'allowRecommendations', value)}
            label="Use viewing data for recommendations"
          />
          <ToggleSwitch
            checked={settings.privacy.shareViewingData}
            onChange={(value) => updateNestedSetting('privacy', 'privacy', 'shareViewingData', value)}
            label="Share viewing data with partners"
          />
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Storage</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cache Size
            </label>
            <select
              value={settings.advanced.cacheSize}
              onChange={(e) => updateNestedSetting('advanced', 'advanced', 'cacheSize', e.target.value)}
              className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="500MB">500 MB</option>
              <option value="1GB">1 GB</option>
              <option value="2GB">2 GB</option>
              <option value="5GB">5 GB</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-gray-700 mt-4">
          <ToggleSwitch
            checked={settings.advanced.offlineDownloads}
            onChange={(value) => updateNestedSetting('advanced', 'advanced', 'offlineDownloads', value)}
            label="Enable offline downloads"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Developer</h3>
        <div className="divide-y divide-gray-700">
          <ToggleSwitch
            checked={settings.advanced.debugMode}
            onChange={(value) => updateNestedSetting('advanced', 'advanced', 'debugMode', value)}
            label="Debug mode"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset All Settings</span>
          </button>
          
          <button
            onClick={clearUserData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear All User Data</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-glass p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card-glass p-8">
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'playback' && renderPlaybackTab()}
              {activeTab === 'privacy' && renderPrivacyTab()}
              {activeTab === 'advanced' && renderAdvancedTab()}
              
              {/* Save Button */}
              {hasChanges && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <button
                    onClick={saveSettings}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(SettingsPage);