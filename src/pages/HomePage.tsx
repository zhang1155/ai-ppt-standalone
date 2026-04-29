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
  Star,
  HelpCircle,
  Image,
  Video,
  FileOutput,
  BrainCircuit,
  Zap,
  Shield,
  Clock,
  Lock,
  ArrowRight,
  FileUp,
  SlidersHorizontal,
  FileDown
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/* ===== 首页 — 红色系、白底、简洁现代 ===== */

const HotTag = ({ label }: { label: string }) => (
  <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-600 bg-white cursor-pointer hover:border-primary/40 hover:text-primary transition-all whitespace-nowrap">
    {label}
  </span>
);

const FeatureCard = ({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color?: string }) => (
  <Card className="border-0 bg-white rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <CardContent className="p-5 flex items-start gap-4">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", color || "bg-red-50")}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#333] text-sm">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const BenefitItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-start gap-3 p-4">
    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-sm text-[#333]">{title}</h4>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('word-to-ppt');

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/canvas');
    }, 2000);
  };

  const hotScenes = ['毕业答辩', '产品发布', '工作汇报', '市场分析', '述职竞聘', '商业计划书'];

  return (
    <AppLayout>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-white text-xl font-bold tracking-wider animate-pulse">AI正在为您生成PPT...</p>
        </div>
      )}

      <div className="max-w-[820px] mx-auto px-6 py-8 flex flex-col bg-white min-h-screen" style={{ gap: '28px' }}>
        
        {/* ===== 🏆 标题区 ===== */}
        <section className="text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <h1 className="text-[32px] font-extrabold tracking-tight text-[#222]">
              AI 智能生成 PPT
            </h1>
            <Star className="text-primary fill-primary" size={28} />
          </div>
          <p className="text-[15px] text-gray-500 mt-1">
            输入主题，AI 帮你快速生成专业、美观的 PPT
          </p>
        </section>

        {/* ===== 📋 核心输入区 ===== */}
        <section>
          <Card className="border-0 p-6 rounded-[14px] bg-white" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <Tabs defaultValue="word-to-ppt" className="w-full" onValueChange={setActiveTab}>
              <div className="mb-5 flex justify-center">
                <TabsList className="bg-gray-50 p-1 rounded-lg h-auto inline-flex gap-0">
                  <TabsTrigger 
                    value="word-to-ppt" 
                    className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm text-[#666] px-5 py-2 h-auto text-sm font-medium transition-all"
                  >
                    Word转PPT
                  </TabsTrigger>
                  <TabsTrigger 
                    value="beautify" 
                    className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm text-[#666] px-5 py-2 h-auto text-sm font-medium transition-all"
                  >
                    美化PPT
                  </TabsTrigger>
                  <TabsTrigger 
                    value="image-to-ppt" 
                    className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm text-[#666] px-5 py-2 h-auto text-sm font-medium transition-all"
                  >
                    图片转PPT
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex justify-center gap-4">
                <div className="w-full max-w-[560px] min-w-0">
                  <div className="relative">
                    <Textarea 
                      placeholder="请输入主题，例如：2025年 AI 行业趋势分析" 
                      className="min-h-[80px] text-sm p-4 border border-gray-200 bg-white rounded-lg resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-offset-0 placeholder:text-gray-400"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-gray-400">0/200</span>
                  </div>

                  {/* 热门场景标签 */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs text-gray-400 mr-1">热门场景：</span>
                    {hotScenes.map((scene) => (
                      <HotTag key={scene} label={scene} />
                    ))}
                  </div>

                  {/* 底部操作栏 — 根据Tab动态变化 */}
                  <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      {activeTab === 'image-to-ppt' ? (
                        /* 图片转PPT - 只有1个按钮 */
                        <Button type="button" variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 h-8 text-xs gap-1.5 bg-white hover:bg-gray-50">
                          <FileUp size={14} />
                          从文件导入
                        </Button>
                      ) : (
                        /* Word转PPT / 美化PPT - 4个按钮 */
                        <>
                          <Button type="button" variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 h-8 text-xs gap-1.5 bg-white hover:bg-gray-50">
                            <FileUp size={14} />
                            从文件导入
                          </Button>
                          <Button type="button" variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 h-8 text-xs gap-1.5 bg-white hover:bg-gray-50">
                            <Upload size={14} />
                            上传参考
                          </Button>
                          <Button type="button" variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 h-8 text-xs gap-1.5 bg-white hover:bg-gray-50">
                            <SlidersHorizontal size={14} />
                            尺寸设置
                          </Button>
                          <Button type="button" variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 h-8 text-xs gap-1.5 bg-white hover:bg-gray-50">
                            <FileDown size={14} />
                            页数设置
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 生成按钮 */}
                <div className="shrink-0 flex items-start">
                  <Button 
                    type="button" 
                    onClick={handleGenerate}
                    className="bg-primary hover:brightness-110 text-white font-bold rounded-xl px-8 py-7 h-auto text-base shadow-md shadow-red-200 transition-all flex items-center gap-2"
                  >
                    生成 PPT
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </Tabs>
          </Card>
        </section>

        {/* ===== 🚀 功能区 - 4张卡片横排 ===== */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[820px] mx-auto">
            <FeatureCard icon={<Image className="text-primary" size={22} />} title="图片生成" desc="AI 生成精美配图" />
            <FeatureCard icon={<Video className="text-primary" size={22} />} title="视频生成" desc="AI 一键生成视频" />
            <FeatureCard icon={<FileOutput className="text-primary" size={22} />} title="内容提炼" desc="提炼核心内容要点" />
            <FeatureCard icon={<BrainCircuit className="text-primary" size={22} />} title="智能配图" desc="AI 匹配图文，丰富内容" />
          </div>
        </section>

        {/* ===== 🎯 底部优势区 ===== */}
        <section className="border-t border-gray-100 pt-6 mt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-[820px] mx-auto">
            <BenefitItem icon={<Zap size={20} />} title="高效智能" desc="AI 加速创作，节省时间" />
            <BenefitItem icon={<Shield size={20} />} title="专业美观" desc="精美模板，专业设计" />
            <BenefitItem icon={<Clock size={20} />} title="多场景适用" desc="覆盖多种场景需求" />
            <BenefitItem icon={<Lock size={20} />} title="安全可靠" desc="数据加密，隐私保障" />
          </div>
        </section>

        {/* ===== 右侧悬浮客服 ===== */}
        <div className="fixed right-6 bottom-10 flex flex-col gap-4 z-40">
          <Button type="button" onClick={() => {}} size="icon" className="w-10 h-10 rounded-full bg-primary shadow-md hover:brightness-110 transition-all text-white">
            <div className="bg-primary w-full h-full flex items-center justify-center font-bold text-sm">晶</div>
          </Button>
          <Button type="button" variant="default" size="icon" className="w-[48px] h-[48px] rounded-full bg-primary border-none shadow-lg hover:shadow-xl hover:brightness-110 transition-all text-white">
            <HelpCircle size={24} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
