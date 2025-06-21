
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DiagnoseTab from "./dashboard/DiagnoseTab";
import PrescribeTab from "./dashboard/PrescribeTab";
import RemediateTab from "./dashboard/RemediateTab";
import { BarChart3, Lightbulb, Zap } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("diagnose");

  return (
    <div className="min-h-screen gradient-soft">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Content Intelligence{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Diagnose, prescribe, and remediate your content performance issues
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass-effect p-2 rounded-2xl cursor-shadow border border-orange-100/30">
            <TabsTrigger 
              value="diagnose" 
              className="flex items-center space-x-3 data-[state=active]:gradient-orange data-[state=active]:text-white rounded-xl py-3 font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Diagnose</span>
            </TabsTrigger>
            <TabsTrigger 
              value="prescribe"
              className="flex items-center space-x-3 data-[state=active]:gradient-orange data-[state=active]:text-white rounded-xl py-3 font-medium"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Prescribe</span>
            </TabsTrigger>
            <TabsTrigger 
              value="remediate"
              className="flex items-center space-x-3 data-[state=active]:gradient-orange data-[state=active]:text-white rounded-xl py-3 font-medium"
            >
              <Zap className="w-5 h-5" />
              <span>Remediate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnose" className="space-y-6">
            <Card className="glass-effect cursor-shadow border border-orange-100/30 rounded-2xl">
              <CardContent className="p-8">
                <DiagnoseTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescribe" className="space-y-6">
            <Card className="glass-effect cursor-shadow border border-orange-100/30 rounded-2xl">
              <CardContent className="p-8">
                <PrescribeTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="remediate" className="space-y-6">
            <Card className="glass-effect cursor-shadow border border-orange-100/30 rounded-2xl">
              <CardContent className="p-8">
                <RemediateTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
