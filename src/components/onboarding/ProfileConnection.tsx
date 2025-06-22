
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, ExternalLink, Loader2, AlertCircle, Instagram, Youtube, Linkedin, Twitter, } from "lucide-react";
import { Link } from "react-router-dom";

interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  connected: boolean;
  connecting: boolean;
  username?: string;
}

interface ProfileConnectionProps {
  selectedPlatforms: string[];
  onConnectionComplete: (connectedProfiles: any[]) => void;
}

const ProfileConnection = ({ selectedPlatforms, onConnectionComplete }: ProfileConnectionProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>(
    selectedPlatforms.map(id => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      icon: getIcon(id),
      color: getColor(id),
      connected: false,
      connecting: false
    }))
  );

  const [currentStep, setCurrentStep] = useState(0);

  function getIcon(id: string) {
    switch (id) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      default: return Instagram;
    }
  }

  function getColor(id: string) {
    switch (id) {
      case 'instagram': return 'from-pink-400 to-purple-500';
      case 'youtube': return 'from-red-400 to-red-600';
      case 'linkedin': return 'from-blue-400 to-blue-600';
      case 'twitter': return 'from-slate-600 to-slate-800';
      default: return 'from-pink-400 to-purple-500';
    }
  }

  const connectPlatform = async (platformIndex: number, username: string) => {
    if (!username.trim()) return;

    setPlatforms(prev =>
      prev.map((platform, index) =>
        index === platformIndex
          ? { ...platform, connecting: true }
          : platform
      )
    );

    // Simulate API connection
    setTimeout(() => {
      setPlatforms(prev =>
        prev.map((platform, index) =>
          index === platformIndex
            ? { ...platform, connecting: false, connected: true, username }
            : platform
        )
      );
    }, 2000);
  };

  const handleContinue = () => {
    const connectedProfiles = platforms
      .filter(p => p.connected)
      .map(p => ({ platform: p.id, username: p.username }));

    onConnectionComplete(connectedProfiles);
  };

  const connectedCount = platforms.filter(p => p.connected).length;
  const hasConnections = connectedCount > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-semibold">
          Connect Your{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Accounts
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Link your creator profiles to start the deep analysis
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-600">
          {connectedCount} of {platforms.length} platforms connected
        </div>
        <Progress value={(connectedCount / platforms.length) * 100} className="h-2 bg-orange-100" />
      </div>
      <div className="space-y-6">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <Card key={platform.id} className=" border border-slate-100 rounded-xl shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${platform.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span>{platform.name}</span>
                  {platform.connected && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>

                {!platform.connected ? (
                  <ProfileConnectionForm
                    platform={platform}
                    onConnect={(username) => connectPlatform(index, username)}
                  />
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-medium">@{platform.username}</span>
                    </div>
                    <Link to={`https://${platform.id}.com/${platform.username}`} target="_blank">
                      <Button variant="outline" size="sm" className="border-green-200 text-green-700">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className=" space-y-4">


        <Button
          onClick={handleContinue}
          disabled={!hasConnections}
          className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl cursor-hover"
          size="lg"
        >
          Start Analysis
        </Button>

        {!hasConnections && (
          <p className="text-sm text-gray-500">
            Connect at least one platform to continue
          </p>
        )}
      </div>
    </div>
  );
};

const ProfileConnectionForm = ({ platform, onConnect }: { platform: Platform; onConnect: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center gap-4">
      <div className="flex-1">
        <Label htmlFor={`${platform.id}-username`} className="text-base font-medium">
          {platform.name} Username
        </Label>
        <Input
          id={`${platform.id}-username`}
          placeholder={`@your${platform.id}handle`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 h-12 rounded-xl border-orange-200 focus:border-orange-400"
          disabled={platform.connecting}
        />
      </div>

      <Button
        type="submit"
        disabled={!username.trim() || platform.connecting}
        className="mt-8 gradient-orange text-white font-medium px-6 py-4 h-12 rounded-xl"
      >
        {platform.connecting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Connecting...
          </>
        ) : (
          `Connect ${platform.name}`
        )}
      </Button>
    </form>
  );
};

export default ProfileConnection;
