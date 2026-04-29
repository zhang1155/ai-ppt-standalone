import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Palette, 
  BarChart3, 
  Layout, 
  Mic, 
  Upload, 
  List, 
  Trophy,
  Headphones,
  User,
  Star,
  HelpCircle
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const QuickTool = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <Card className="hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer border-none bg-white rounded-[10px] group hover:-translate-y-[2px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <CardContent className="p-5 flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center transition-transform text-primary">
        {React.cloneElement(icon as React.ReactElement<{size: number}>, { size: 32 })}
      </div>
      <span className="text-[14px] font-medium text-[#333] mt-2">{label}</span>
    </CardContent>
  </Card>
);

const TemplateCard = ({ title, desc, gradient }: { title: string, desc: string, gradient: string }) => (
  <Link to="/canvas">
    <Card className="overflow-hidden group cursor-pointer border-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all rounded-[12px]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className={cn("h-[150px] relative overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-105", gradient)}>
        <div className="text-white opacity-20"><Layout size={48} /></div>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <CardContent className="p-4 bg-white">
        <h4 className="font-bold text-[16px] truncate text-[#333]">{title}</h4>
        <div className="flex gap-2 mt-1 overflow-hidden">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#F5F5F5] text-[#999] font-normal border-none">工作汇报</Badge>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#F5F5F5] text-[#999] font-normal border-none">商务</Badge>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/canvas');
    }, 2000);
  };

  const templates = [
    { gradient: 'bg-gradient-to-br from-[#E53935] to-[#FF8A80]', title: '商务简约工作汇报', desc: '适用于月度、季度总结汇报' },
    { gradient: 'bg-gradient-to-br from-[#D32F2F] to-[#FF5252]', title: '创意述职竞聘模版', desc: '展现个人实力，助力职场进阶' },
    { gradient: 'bg-gradient-to-br from-[#C62828] to-[#EF5350]', title: '互联网科技产品发布', desc: '极简科技感，突出产品核心卖点' },
    { gradient: 'bg-gradient-to-br from-[#B71C1C] to-[#E57373]', title: '红色大气党政总结', desc: '专业标准，权威大气风格' },
    { gradient: 'bg-gradient-to-br from-[#E53935] via-[#EF5350] to-[#FFCDD2]', title: '极简风营销推广方案', desc: '留白艺术，视觉聚焦转化' },
    { gradient: 'bg-gradient-to-br from-[#F44336] to-[#FF8A80]', title: '现代感校园招新演示', desc: '活力四射，吸引更多关注' },
  ];

  const categories = ['全部', '工作汇报', '述职竞聘', '营销推广', '党政风采', '毕业答辩', '校园招新'];

  return (
    <AppLayout>
      <div className="max-w-[1200px] mx-auto px-10 py-8 flex flex-col relative bg-[#F5F5F5] min-h-screen" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif", gap: '32px' }}>
        
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-white text-xl font-bold tracking-wider animate-pulse">AI正在为您生成PPT...</p>
          </div>
        )}
        {/* Header Section */}
        <section className="relative mt-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[36px] font-bold tracking-tight text-[#333]">一句话 做PPT ✨</h1>
          </div>
          <p className="text-[16px] text-[#666] mt-2">
            输入主题和需求，AI 帮你快速生成专业PPT
          </p>
        </section>

        {/* Core Input Section */}
        <section>
          <Card className="border-none p-6 rounded-[12px] bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Tabs defaultValue="one-sentence" className="w-full">
              <div className="mb-6">
                <TabsList className="bg-transparent h-auto p-0 gap-8">
                  <TabsTrigger 
                    value="one-sentence" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold text-[#666] px-0 py-2 h-auto text-base shadow-none bg-transparent font-medium"
                  >
                    一句话做PPT
                  </TabsTrigger>
                  <TabsTrigger 
                    value="word-to-ppt" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold text-[#666] px-0 py-2 h-auto text-base shadow-none bg-transparent font-medium"
                  >
                    Word转PPT
                  </TabsTrigger>
                  <TabsTrigger 
                    value="beautify" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-bold text-[#666] px-0 py-2 h-auto text-base shadow-none bg-transparent font-medium"
                  >
                    美化PPT
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="relative">
                <Textarea 
                  placeholder="请输入你想要PPT主题和内容，例如：人工智能发展现状与趋势..." 
                  className="min-h-[120px] text-base p-4 border border-[#e8e8e8] bg-white rounded-[8px] resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-offset-0 placeholder:text-[#999]"
                />
                <Button 
                  type="button"
                  onClick={() => {}}
                  size="icon" 
                  className="absolute bottom-4 right-4 bg-primary hover:brightness-110 rounded-full w-12 h-12 shadow-md text-white transition-all"
                >
                  <Mic size={24} />
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <Button type="button" onClick={() => {}} variant="outline" className="rounded-[8px] gap-2 border-[#ddd] text-[#666] px-[20px] py-[10px] h-auto font-medium hover:bg-[#FAFAFA] bg-white">
                    <Upload size={18} />
                    <span>上传文件</span>
                  </Button>
                  <Button type="button" onClick={() => {}} variant="outline" className="rounded-[8px] gap-2 border-[#ddd] text-[#666] px-[20px] py-[10px] h-auto font-medium hover:bg-[#FAFAFA] bg-white">
                    <List size={18} />
                    <span>导入大纲</span>
                  </Button>
                  <Link to="/canvas">
                    <Button type="button" variant="outline" className="rounded-[8px] gap-2 border-[#ddd] text-[#666] px-[20px] py-[10px] h-auto font-medium hover:bg-[#FAFAFA] bg-white">
                      <Layout size={18} />
                      <span>选择模板</span>
                    </Button>
                  </Link>
                </div>
                
                <Button 
                  type="button" 
                  onClick={handleGenerate}
                  size="lg" 
                  className="bg-primary hover:brightness-110 text-white font-bold rounded-[8px] px-[28px] py-[12px] h-auto shadow-sm transition-all"
                >
                  智能生成
                </Button>
              </div>
            </Tabs>
          </Card>
        </section>

        {/* Quick Tools Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <QuickTool icon={<Sparkles />} label="AI大纲生成" />
            <QuickTool icon={<Layout />} label="智能排版" />
            <QuickTool icon={<Palette />} label="一键换肤" />
            <QuickTool icon={<BarChart3 />} label="智能图表" />
            <QuickTool icon={<Trophy />} label="模板推荐" />
            <QuickTool icon={<Mic />} label="语音输入" />
          </div>
        </section>

        {/* Recommended Templates Section - Improved with Horizontal Scroll */}
        <section className="flex flex-col gap-6 pb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-bold text-[#333]">推荐模板</h2>
              <Badge className="bg-primary hover:brightness-110 rounded-[20px] text-[12px] px-4 py-1 font-medium border-none text-white cursor-pointer transition-all">
                全部
              </Badge>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar max-w-[60%]">
              {categories.slice(1).map((cat, i) => (
                <span 
                  key={cat} 
                  className={cn(
                    "text-[14px] whitespace-nowrap cursor-pointer transition-all px-4 py-1.5 rounded-[20px] border bg-white",
                    i === 0 ? "border-primary text-primary" : "border-[#e0e0e0] text-[#666] hover:text-primary hover:border-primary/50"
                  )}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {templates.map((tpl, i) => (
              <div key={i} className="min-w-[240px] snap-start">
                <TemplateCard {...tpl} />
              </div>
            ))}
          </div>
        </section>

        {/* Floating Actions */}
        <div className="fixed right-6 bottom-10 flex flex-col gap-4 z-40">
          <Button type="button" onClick={() => {}} size="icon" className="w-10 h-10 rounded-full bg-primary shadow-md hover:brightness-110 transition-all text-white border-none p-0 overflow-hidden">
            <div className="bg-primary w-full h-full flex items-center justify-center font-bold text-sm">晶</div>
          </Button>
          <Button type="button" onClick={() => {}} variant="default" size="icon" className="w-[48px] h-[48px] rounded-full bg-primary border-none shadow-lg hover:shadow-xl hover:brightness-110 transition-all text-white">
            <HelpCircle size={24} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
