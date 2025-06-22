import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Mail, 
  Linkedin, 
  Globe, 
  Star, 
  Users, 
  Target, 
  Sparkles,
  ArrowRight,
  MessageSquare,
  Copy,
  CheckCircle,
  Zap
} from "lucide-react";
import { PitchGenerator } from "@/components/PitchGenerator";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  industry: string;
  category: string;
  matchScore: number;
  matchReason: string;
  sponsoredCreators: string[];
  description: string;
  tone: string;
  previousCampaigns: string[];
  contactInfo: {
    email?: string;
    linkedin?: string;
    website?: string;
  };
  pitchTemplate: string;
  dealSize: string;
  isHotMatch: boolean;
  isPitchReady: boolean;
}

const SponsorTab = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [showPitchGenerator, setShowPitchGenerator] = useState(false);

  // Mock user data - in real app this would come from video analysis
  const userData = {
    recentVideo: "5-Minute Morning Routines That Actually Work",
    audienceSize: "50K followers",
    engagementRate: "8.7%",
    topPerformingContent: "productivity and lifestyle optimization"
  };

  const sponsors: Sponsor[] = [
    {
      id: "1",
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      industry: "Sports & Fitness",
      category: "Athletic Wear",
      matchScore: 94,
      matchReason: "Sponsored @fitnessguru and @workoutpro, similar audience demographics and content format",
      sponsoredCreators: ["@fitnessguru", "@workoutpro", "@healthylifestyle"],
      description: "Global leader in athletic footwear and apparel, known for empowering athletes and fitness enthusiasts worldwide.",
      tone: "Motivational, empowering, performance-focused",
      previousCampaigns: [
        "Just Do It campaign with fitness creators",
        "Sustainable collection launch",
        "Women's empowerment series"
      ],
      contactInfo: {
        email: "partnerships@nike.com",
        linkedin: "linkedin.com/company/nike",
        website: "nike.com"
      },
      pitchTemplate: "Hi Nike team! I'm a fitness creator with 50K+ engaged followers who love workout content. My recent video on '5-Minute Morning Routines' got 200K+ views and 15% engagement. I'd love to showcase how Nike's latest collection fits into my audience's active lifestyle. Would love to discuss a potential collaboration!",
      dealSize: "$5K - $15K",
      isHotMatch: true,
      isPitchReady: true
    },
    {
      id: "2",
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop",
      industry: "Technology",
      category: "Music & Audio",
      matchScore: 87,
      matchReason: "Your productivity content aligns with their focus on background music and focus playlists",
      sponsoredCreators: ["@productivityguru", "@studymotivation", "@workfromhome"],
      description: "Leading music streaming platform that helps people discover, listen to, and share music and podcasts.",
      tone: "Creative, energetic, community-focused",
      previousCampaigns: [
        "Study with Spotify campaign",
        "Workout playlist collaborations",
        "Podcast creator partnerships"
      ],
      contactInfo: {
        email: "creator-partnerships@spotify.com",
        linkedin: "linkedin.com/company/spotify",
        website: "spotify.com"
      },
      pitchTemplate: "Hi Spotify! I create productivity and lifestyle content that your audience loves. My recent video on 'Morning Routines That Actually Work' featured background music and got amazing engagement. I'd love to create content showcasing how Spotify's focus playlists help my audience stay productive. Let's discuss a collaboration!",
      dealSize: "$3K - $10K",
      isHotMatch: false,
      isPitchReady: true
    },
    {
      id: "3",
      name: "Notion",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      industry: "Technology",
      category: "Productivity",
      matchScore: 92,
      matchReason: "Perfect match for your productivity and organization content",
      sponsoredCreators: ["@productivitypro", "@organizewithme", "@digitalnomad"],
      description: "All-in-one workspace for notes, docs, project management, and team collaboration.",
      tone: "Clean, organized, innovative",
      previousCampaigns: [
        "Student organization campaigns",
        "Remote work productivity series",
        "Template creator partnerships"
      ],
      contactInfo: {
        email: "partnerships@notion.so",
        linkedin: "linkedin.com/company/notion",
        website: "notion.so"
      },
      pitchTemplate: "Hi Notion team! I'm a productivity creator who helps people organize their lives better. My recent video on 'Building the Perfect Morning Routine' got 150K+ views and my audience is always asking about organization tools. I'd love to show how Notion can transform their productivity. Let's create something amazing together!",
      dealSize: "$2K - $8K",
      isHotMatch: true,
      isPitchReady: true
    },
    {
      id: "4",
      name: "Glossier",
      logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
      industry: "Beauty & Personal Care",
      category: "Skincare & Makeup",
      matchScore: 78,
      matchReason: "Your lifestyle content appeals to their target demographic",
      sponsoredCreators: ["@beautyguru", "@skincareaddict", "@lifestylevlogger"],
      description: "Beauty brand that celebrates real girls, in real life, with real beauty products.",
      tone: "Authentic, inclusive, community-driven",
      previousCampaigns: [
        "Real beauty campaigns",
        "Skincare routine collaborations",
        "Community creator partnerships"
      ],
      contactInfo: {
        email: "partnerships@glossier.com",
        linkedin: "linkedin.com/company/glossier",
        website: "glossier.com"
      },
      pitchTemplate: "Hi Glossier! I create authentic lifestyle content that resonates with your community. My recent video on 'My Honest Morning Routine' got 180K+ views and my audience loves discovering new beauty products. I'd love to share how Glossier fits into my real, everyday life. Let's create something authentic together!",
      dealSize: "$4K - $12K",
      isHotMatch: false,
      isPitchReady: false
    },
    {
      id: "5",
      name: "Calm",
      logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
      industry: "Health & Wellness",
      category: "Mental Health",
      matchScore: 85,
      matchReason: "Your wellness content aligns perfectly with their mindfulness mission",
      sponsoredCreators: ["@mindfulnesscoach", "@wellnessguru", "@meditationguide"],
      description: "Leading app for sleep, meditation, and relaxation with millions of users worldwide.",
      tone: "Peaceful, calming, supportive",
      previousCampaigns: [
        "Sleep better campaigns",
        "Meditation challenge collaborations",
        "Mental health awareness partnerships"
      ],
      contactInfo: {
        email: "partnerships@calm.com",
        linkedin: "linkedin.com/company/calm",
        website: "calm.com"
      },
      pitchTemplate: "Hi Calm team! I create wellness content that helps people find balance in their busy lives. My recent video on '5-Minute Stress Relief Techniques' got 120K+ views and my audience is always looking for ways to relax. I'd love to show how Calm can help them find peace in their daily routine. Let's create something meaningful!",
      dealSize: "$3K - $10K",
      isHotMatch: true,
      isPitchReady: true
    }
  ];

  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sponsor.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || sponsor.category === selectedCategory;
    const matchesIndustry = selectedIndustry === "all" || sponsor.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const handleCopyTemplate = async () => {
    if (selectedSponsor) {
      await navigator.clipboard.writeText(selectedSponsor.pitchTemplate);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-orange-600 bg-orange-100";
    return "text-blue-600 bg-blue-100";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Brand Matches Based on Your Content</h1>
        <p className="text-slate-500">We scanned your past videos, niche, and top-performing peers to find potential sponsors.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-bg-sidebar"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 border-bg-sidebar">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Athletic Wear">Athletic Wear</SelectItem>
            <SelectItem value="Music & Audio">Music & Audio</SelectItem>
            <SelectItem value="Productivity">Productivity</SelectItem>
            <SelectItem value="Skincare & Makeup">Skincare & Makeup</SelectItem>
            <SelectItem value="Mental Health">Mental Health</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-full sm:w-48 border-bg-sidebar">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Sports & Fitness">Sports & Fitness</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
            <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sponsor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSponsors.map((sponsor) => (
          <Card
            key={sponsor.id}
            className="border-bg-sidebar rounded-lg shadow-none cursor-pointer hover:shadow-lg transition-all duration-300 cursor-hover"
            onClick={() => setSelectedSponsor(sponsor)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{sponsor.name}</h3>
                    <p className="text-sm text-gray-500">{sponsor.industry}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getMatchColor(sponsor.matchScore)}>
                    {sponsor.matchScore}% match
                  </Badge>
                  {sponsor.isHotMatch && (
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      🔥 Hot Match
                    </Badge>
                  )}
                  {sponsor.isPitchReady && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      💼 Pitch Ready
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{sponsor.matchReason}</p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{sponsor.dealSize}</span> avg. deal
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Persistent CTA */}
      <Card className="border-bg-sidebar rounded-lg shadow-none bg-gradient-to-r from-orange-50 to-orange-100">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-orange-500" />
          <h3 className="text-xl font-semibold mb-2">Don't see your dream sponsor?</h3>
          <p className="text-gray-600 mb-4">We can scout for specific brands that match your content and audience.</p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Request Brand Scouting
          </Button>
        </CardContent>
      </Card>

      {/* Sponsor Detail Modal */}
      <Dialog open={!!selectedSponsor} onOpenChange={() => setSelectedSponsor(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <img
                src={selectedSponsor?.logo}
                alt={selectedSponsor?.name}
                className="w-8 h-8 rounded"
              />
              <span>{selectedSponsor?.name}</span>
              <Badge className={getMatchColor(selectedSponsor?.matchScore || 0)}>
                {selectedSponsor?.matchScore}% match
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedSponsor && (
            <div className="space-y-6">
              {/* Brand Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Brand Overview</h3>
                  <p className="text-gray-600 text-sm mb-3">{selectedSponsor.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span className="text-sm"><strong>Tone:</strong> {selectedSponsor.tone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm"><strong>Sponsored:</strong> {selectedSponsor.sponsoredCreators.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Previous Campaigns</h3>
                  <ul className="space-y-2">
                    {selectedSponsor.previousCampaigns.map((campaign, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{campaign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedSponsor.contactInfo.email && (
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedSponsor.contactInfo.email}
                    </Button>
                  )}
                  {selectedSponsor.contactInfo.linkedin && (
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  )}
                  {selectedSponsor.contactInfo.website && (
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                </div>
              </div>

              {/* Pitch Template */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Pitch Template</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyTemplate}
                    className="border-orange-200 text-orange-600"
                  >
                    {copiedTemplate ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Template
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSponsor.pitchTemplate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowPitchGenerator(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Generate Custom Pitch
                </Button>
                <Button variant="outline" className="flex-1 border-orange-200 text-orange-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pitch Generator Modal */}
      {selectedSponsor && (
        <PitchGenerator
          isOpen={showPitchGenerator}
          onClose={() => setShowPitchGenerator(false)}
          brand={{
            name: selectedSponsor.name,
            industry: selectedSponsor.industry,
            description: selectedSponsor.description
          }}
          userData={userData}
        />
      )}
    </div>
  );
};

export default SponsorTab; 