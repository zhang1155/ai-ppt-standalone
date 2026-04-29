import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image, 
  Type, 
  Sticker,
  Sparkles,
  Shuffle,
  Sliders, 
  Volume2, 
  MoreHorizontal,
  HelpCircle,
  Settings,
  Undo,
  Redo,
  Eye,
  Download,
  X,
  Bot,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// 左侧工具栏图标项
const ToolbarIcon = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div 
    className={cn(
      "w-full h-[64px] flex flex-col items-center justify-center cursor-pointer transition-all relative group",
      active ? "bg-[#FFF0F0] text-primary" : "text-[#999] hover:text-white hover:bg-[#3a3a3a]"
    )}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />}
    <div className={cn("flex items-center justify-center", active ? "text-primary" : "text-[#999] group-hover:text-white")}>
      {React.cloneElement(icon as React.ReactElement<{size: number}>, { size: 24 })}
    </div>
    <span className="text-[12px] mt-1">{label}</span>
  </div>
);

// PPT页面缩略图卡片
const PPTSlideCard = ({ 
  index, 
  title,
  description,
  gradient,
  onClick
}: { 
  index: number, 
  title: string,
  description: string,
  gradient: string,
  onClick: () => void
}) => (
  <Card 
    onClick={onClick}
    className="overflow-hidden group cursor-pointer border-none hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-[4px] rounded-[8px]" 
    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
  >
    <div className={cn("aspect-video relative overflow-hidden flex items-center justify-center w-full h-full", gradient)}>
      {/* 序号标记 */}
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-black font-bold text-sm shadow-sm z-10">
        {index}
      </div>
      
      {/* 模拟PPT内容 */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <h3 className="text-white text-xl font-bold text-center drop-shadow-lg">{title}</h3>
      </div>
      
      {/* 悬浮按钮 */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button type="button" onClick={(e) => { e.stopPropagation(); onClick(); }} className="bg-primary hover:brightness-110 text-white font-medium rounded-[6px] px-6 py-2 shadow-lg">
          编辑此页面
        </Button>
      </div>
    </div>
    <CardContent className="p-3 bg-white">
      <p className="text-[14px] font-bold text-[#333] truncate">{title}</p>
      <p className="text-[12px] text-[#999] truncate mt-1">{description}</p>
    </CardContent>
  </Card>
);

const CanvasPage = () => {
  const navigate = useNavigate();
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [opacity, setOpacity] = useState([100]);
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [saturation, setSaturation] = useState([0]);

  // 模拟生成的8张PPT页面
  const slides = [
    { gradient: 'bg-gradient-to-br from-[#E53935] via-[#FF6F00] to-[#FFD54F]', title: 'AI赋能智能办公新时代', description: '封面页' },
    { gradient: 'bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab]', title: '内容概览', description: '目录页' },
    { gradient: 'bg-gradient-to-br from-[#4a148c] via-[#6a1b9a] to-[#8e24aa]', title: '人工智能技术发展现状', description: '技术背景' },
    { gradient: 'bg-gradient-to-br from-[#E53935] via-[#f4511e] to-[#ff6f00]', title: '核心功能介绍', description: '功能展示' },
    { gradient: 'bg-gradient-to-br from-[#00695c] via-[#00897b] to-[#26a69a]', title: '应用场景分析', description: '场景说明' },
    { gradient: 'bg-gradient-to-br from-[#ad1457] via-[#c2185b] to-[#d81b60]', title: '数据趋势与洞察', description: '数据分析' },
    { gradient: 'bg-gradient-to-br from-[#b71c1c] via-[#c62828] to-[#d32f2f]', title: '解决方案与优势', description: '方案介绍' },
    { gradient: 'bg-gradient-to-br from-[#f57f17] via-[#f9a825] to-[#212121]', title: '携手共创未来', description: '感谢页' },
  ];

  const handleSlideClick = (index: number) => {
    navigate(`/editor/${index + 1}`);
  };

  return (
    <div className="flex h-screen bg-[#f8f8f8] overflow-hidden" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif" }}>
      
      {/* 左侧垂直工具栏 */}
      <aside className="w-[60px] bg-[#2D2D2D] flex flex-col items-center py-4 shrink-0">
        <div className="flex-1 flex flex-col w-full">
          <ToolbarIcon icon={<Image />} label="素材" active />
          <ToolbarIcon icon={<Type />} label="文本" />
          <ToolbarIcon icon={<Sticker />} label="贴纸" />
          <ToolbarIcon icon={<Sparkles />} label="特效" />
          <ToolbarIcon icon={<Shuffle />} label="转场" />
          <ToolbarIcon icon={<Sliders />} label="调节" />
          <ToolbarIcon icon={<Volume2 />} label="音频" />
          <ToolbarIcon icon={<MoreHorizontal />} label="更多" />
        </div>
        
        <div className="flex flex-col w-full mt-auto">
          <ToolbarIcon icon={<HelpCircle />} label="帮助" />
          <ToolbarIcon icon={<Settings />} label="设置" />
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 顶部导航栏 */}
        <header className="h-[40px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {/* 返回按钮 */}
            <Button 
              type="button" 
              onClick={() => navigate('/')} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-[#666] hover:text-primary"
            >
              <ArrowLeft size={18} />
            </Button>
            
            {/* 面包屑 */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[#999] hover:text-primary text-[13px]">文件</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#999]">
                  <span className="text-[13px]">{">"}</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[#999] hover:text-primary text-[13px]">我的项目</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#999]">
                  <span className="text-[13px]">{">"}</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#333] font-medium text-[13px]">AI赋能智能办公新时代</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* 自动保存状态 */}
            <div className="flex items-center gap-2 ml-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[12px] text-green-600 font-medium">已保存</span>
            </div>
          </div>
          
          {/* 右侧按钮组 */}
          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => {}} variant="ghost" size="icon" className="h-8 w-8 text-[#999] hover:text-[#333]">
              <Undo size={16} />
            </Button>
            <Button type="button" onClick={() => {}} variant="ghost" size="icon" className="h-8 w-8 text-[#999] hover:text-[#333]">
              <Redo size={16} />
            </Button>
            
            <div className="w-px h-4 bg-[#e8e8e8] mx-1" />
            
            <Button type="button" onClick={() => {}} variant="outline" className="rounded-[6px] gap-2 border-[#ddd] bg-white text-[#666] px-3 py-0 h-8 text-[13px] font-medium hover:bg-[#FAFAFA]">
              <Eye size={14} />
              <span>预览</span>
            </Button>
            
            <Button type="button" onClick={() => {}} className="bg-primary hover:brightness-110 text-white font-medium rounded-[6px] px-4 py-0 h-8 text-[13px] shadow-sm transition-all">
              导出
            </Button>
            
            <Button type="button" onClick={() => {}} className="bg-[#1677ff] hover:brightness-110 text-white font-medium rounded-[6px] px-4 py-0 h-8 text-[13px] shadow-sm transition-all">
              <Download size={14} className="mr-1.5" />
              下载
            </Button>
          </div>
        </header>

        {/* 中间PPT页面缩略图网格 */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {slides.map((slide, i) => (
              <PPTSlideCard 
                key={i} 
                index={i + 1} 
                title={slide.title}
                description={slide.description}
                gradient={slide.gradient}
                onClick={() => handleSlideClick(i)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* 右侧属性面板（检查器） */}
      {inspectorOpen && (
        <aside className="w-[280px] bg-white border-l border-[#e8e8e8] flex flex-col shrink-0 overflow-hidden">
          {/* 标题栏 */}
          <div className="h-[56px] border-b border-[#e8e8e8] flex items-center justify-between px-4 shrink-0">
            <h3 className="font-bold text-[16px] text-[#333]">检查器</h3>
            <Button 
              type="button" 
              onClick={() => setInspectorOpen(false)} 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 text-[#666] hover:text-[#333]"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* 折叠面板内容 */}
          <div className="flex-1 overflow-y-auto p-4">
            <Accordion type="multiple" defaultValue={["canvas"]} className="w-full">
              
              {/* 画面面板 */}
              <AccordionItem value="canvas" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  画面
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-[13px] text-[#666]">缩放</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="100" className="h-8 text-[13px]" />
                      <span className="text-[13px] text-[#666]">%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label className="text-[13px] text-[#666]">X 位置</Label>
                      <Input type="number" defaultValue="0" className="h-8 text-[13px]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[13px] text-[#666]">Y 位置</Label>
                      <Input type="number" defaultValue="0" className="h-8 text-[13px]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[13px] text-[#666]">旋转</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="0" className="h-8 text-[13px]" />
                      <span className="text-[13px] text-[#666]">°</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[13px] text-[#666]">不透明度</Label>
                      <span className="text-[13px] text-[#333] font-medium">{opacity[0]}%</span>
                    </div>
                    <Slider 
                      value={opacity} 
                      onValueChange={setOpacity} 
                      max={100} 
                      step={1} 
                      className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 混合面板 */}
              <AccordionItem value="blend" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  混合
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-[13px] text-[#666]">混合模式</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-8 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">正常</SelectItem>
                        <SelectItem value="multiply">正片叠底</SelectItem>
                        <SelectItem value="screen">滤色</SelectItem>
                        <SelectItem value="overlay">叠加</SelectItem>
                        <SelectItem value="darken">变暗</SelectItem>
                        <SelectItem value="lighten">变亮</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[13px] text-[#666]">不透明度</Label>
                      <span className="text-[13px] text-[#333] font-medium">{opacity[0]}%</span>
                    </div>
                    <Slider 
                      value={opacity} 
                      onValueChange={setOpacity} 
                      max={100} 
                      step={1} 
                      className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 裁剪面板 */}
              <AccordionItem value="crop" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  裁剪
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-[13px] text-[#666]">裁剪比例</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2">自由</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2">1:1</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2">4:3</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2 bg-[#FFF0F0] border-primary text-primary">16:9</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2">3:4</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] px-2">9:16</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[13px] text-[#666]">圆角</Label>
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => {}} variant="outline" className="flex-1 h-8 text-[12px]">无</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="flex-1 h-8 text-[12px]">小</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="flex-1 h-8 text-[12px]">中</Button>
                      <Button type="button" onClick={() => {}} variant="outline" className="flex-1 h-8 text-[12px]">大</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 音频面板 */}
              <AccordionItem value="audio" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  音频
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-4 pb-4">
                  <p className="text-[13px] text-[#999] text-center py-4">暂无音频设置</p>
                </AccordionContent>
              </AccordionItem>

              {/* 变速面板 */}
              <AccordionItem value="speed" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  变速
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-4 pb-4">
                  <p className="text-[13px] text-[#999] text-center py-4">暂无变速设置</p>
                </AccordionContent>
              </AccordionItem>

              {/* 动画面板 */}
              <AccordionItem value="animation" className="border-b border-[#e8e8e8]">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  动画
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-4 pb-4">
                  <p className="text-[13px] text-[#999] text-center py-4">暂无动画设置</p>
                </AccordionContent>
              </AccordionItem>

              {/* 调节面板 */}
              <AccordionItem value="adjust" className="border-none">
                <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                  调节
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[13px] text-[#666]">亮度</Label>
                      <span className="text-[13px] text-[#333] font-medium">{brightness[0]}</span>
                    </div>
                    <Slider 
                      value={brightness} 
                      onValueChange={setBrightness} 
                      min={-100} 
                      max={100} 
                      step={1} 
                      className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[13px] text-[#666]">对比度</Label>
                      <span className="text-[13px] text-[#333] font-medium">{contrast[0]}</span>
                    </div>
                    <Slider 
                      value={contrast} 
                      onValueChange={setContrast} 
                      min={-100} 
                      max={100} 
                      step={1} 
                      className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[13px] text-[#666]">饱和度</Label>
                      <span className="text-[13px] text-[#333] font-medium">{saturation[0]}</span>
                    </div>
                    <Slider 
                      value={saturation} 
                      onValueChange={setSaturation} 
                      min={-100} 
                      max={100} 
                      step={1} 
                      className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>
      )}

      {/* 底部悬浮AI助手 */}
      <div className="fixed right-6 bottom-6 z-50">
        <Card className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-none overflow-hidden w-[360px]">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot size={20} />
              </div>
              <span className="font-bold text-[14px] text-[#333]">AI 智能助手</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <Button type="button" onClick={() => {}} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI写文案
              </Button>
              <Button type="button" onClick={() => {}} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI换图
              </Button>
              <Button type="button" onClick={() => {}} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                智能剪辑
              </Button>
              <Button type="button" onClick={() => {}} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI配音
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CanvasPage;
