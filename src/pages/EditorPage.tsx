import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ArrowLeft,
  Send,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Minus,
  Upload
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

// 可选中的元素类型
type ElementType = 'text' | 'image' | 'shape' | null;

const EditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedElement, setSelectedElement] = useState<ElementType>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  
  // 元素属性状态
  const [opacity, setOpacity] = useState([100]);
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [saturation, setSaturation] = useState([0]);
  const [fontSize, setFontSize] = useState(24);

  // 模拟PPT页面数据
  const slides = [
    { title: 'AI赋能智能办公新时代', gradient: 'bg-gradient-to-br from-[#E53935] via-[#FF6F00] to-[#FFD54F]' },
    { title: '内容概览', gradient: 'bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab]' },
    { title: '人工智能技术发展现状', gradient: 'bg-gradient-to-br from-[#4a148c] via-[#6a1b9a] to-[#8e24aa]' },
    { title: '核心功能介绍', gradient: 'bg-gradient-to-br from-[#E53935] via-[#f4511e] to-[#ff6f00]' },
    { title: '应用场景分析', gradient: 'bg-gradient-to-br from-[#00695c] via-[#00897b] to-[#26a69a]' },
    { title: '数据趋势与洞察', gradient: 'bg-gradient-to-br from-[#ad1457] via-[#c2185b] to-[#d81b60]' },
    { title: '解决方案与优势', gradient: 'bg-gradient-to-br from-[#b71c1c] via-[#c62828] to-[#d32f2f]' },
    { title: '携手共创未来', gradient: 'bg-gradient-to-br from-[#f57f17] via-[#f9a825] to-[#212121]' },
  ];

  const currentSlide = slides[Number(id) - 1] || slides[0];

  const handleElementClick = (type: ElementType) => {
    setSelectedElement(type);
    setAiPrompt('');
  };

  const handleAiSubmit = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    // 模拟AI生成
    setTimeout(() => {
      setAiLoading(false);
      setAiPrompt('');
      // 这里可以更新元素内容
    }, 2000);
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
              onClick={() => navigate('/canvas')} 
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
                  <BreadcrumbLink href="/canvas" className="text-[#999] hover:text-primary text-[13px]">我的项目</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#999]">
                  <span className="text-[13px]">{">"}</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#333] font-medium text-[13px]">第 {id} 页</BreadcrumbPage>
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

        {/* 中间单页放大展示区 */}
        <main 
          onClick={() => setSelectedElement(null)}
          className="flex-1 overflow-y-auto px-6 py-6 flex items-center justify-center cursor-default"
        >
          <div className="w-[70%] max-w-[1000px]">
            {/* PPT页面容器 */}
            <div 
              onClick={(e) => { e.stopPropagation(); handleElementClick('image'); }}
              className={cn(
                "aspect-video rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] relative overflow-hidden cursor-pointer transition-all",
                currentSlide.gradient,
                selectedElement === 'image' && "ring-2 ring-primary ring-offset-2"
              )}
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0" />
              
              {/* 标题文本元素（可点击选中） */}
              <div 
                onClick={(e) => { e.stopPropagation(); handleElementClick('text'); }}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-10",
                  selectedElement === 'text' && "border-2 border-primary"
                )}
              >
                <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg px-8 py-4">
                  {currentSlide.title}
                </h1>
                
                {/* 选中时的调整手柄 */}
                {selectedElement === 'text' && (
                  <>
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                  </>
                )}
              </div>
              
              {/* 装饰形状元素（可点击选中） */}
              <div 
                onClick={() => handleElementClick('shape')}
                className={cn(
                  "absolute bottom-8 right-8 w-24 h-24 border-4 border-white/30 rounded-full cursor-pointer transition-all",
                  selectedElement === 'shape' && "border-primary"
                )}
              >
                {selectedElement === 'shape' && (
                  <>
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-sm" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-sm" />
                  </>
                )}
              </div>
              
              {/* 装饰线条元素 */}
              <div className="absolute top-8 left-8 w-32 h-1 bg-white/50 rounded-full" />
            </div>
            
            {/* AI搜索框（选中元素时显示） */}
            {selectedElement && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Card className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-none">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Input 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
                        placeholder="告诉我你想要的需求"
                        className="flex-1 h-10 text-[14px] border-[#e8e8e8] focus-visible:ring-1 focus-visible:ring-primary"
                        disabled={aiLoading}
                      />
                      <Button 
                        type="button"
                        onClick={handleAiSubmit}
                        disabled={aiLoading || !aiPrompt.trim()}
                        className="bg-[#1677ff] hover:brightness-110 text-white rounded-[8px] h-10 px-6 shadow-sm"
                      >
                        {aiLoading ? (
                          <span className="text-[14px]">AI正在生成...</span>
                        ) : (
                          <>
                            <Send size={16} className="mr-2" />
                            <span className="text-[14px]">发送</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 右侧属性面板（动态切换） */}
      {inspectorOpen && (
        <aside className="w-[280px] bg-white border-l border-[#e8e8e8] flex flex-col shrink-0 overflow-hidden">
          {/* 标题栏 */}
          <div className="h-[56px] border-b border-[#e8e8e8] flex items-center justify-between px-4 shrink-0">
            <h3 className="font-bold text-[16px] text-[#333]">
              {selectedElement ? '元素属性' : '页面属性'}
            </h3>
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
            {!selectedElement ? (
              // 未选中元素时显示页面级属性
              <Accordion type="multiple" defaultValue={["canvas"]} className="w-full">
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : selectedElement === 'text' ? (
              // 选中文本元素时显示文本属性
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">字体</Label>
                  <Select defaultValue="pingfang">
                    <SelectTrigger className="h-9 text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pingfang">苹方</SelectItem>
                      <SelectItem value="yahei">微软雅黑</SelectItem>
                      <SelectItem value="songti">宋体</SelectItem>
                      <SelectItem value="heiti">黑体</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">字号</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9"
                    >
                      <Minus size={16} />
                    </Button>
                    <Input 
                      type="number" 
                      value={fontSize} 
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="h-9 text-[13px] text-center" 
                    />
                    <Button 
                      type="button"
                      onClick={() => setFontSize(fontSize + 2)}
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">颜色</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#FFFFFF', '#000000', '#E53935', '#1677ff', '#FFD54F', '#26a69a'].map((color) => (
                      <div 
                        key={color}
                        className="w-8 h-8 rounded-md cursor-pointer border-2 border-[#e8e8e8] hover:border-primary transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">样式</Label>
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => {}} variant="outline" size="icon" className="h-9 w-9">
                      <Bold size={16} />
                    </Button>
                    <Button type="button" onClick={() => {}} variant="outline" size="icon" className="h-9 w-9">
                      <Italic size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">对齐</Label>
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => {}} variant="outline" size="icon" className="h-9 w-9">
                      <AlignLeft size={16} />
                    </Button>
                    <Button type="button" onClick={() => {}} variant="outline" size="icon" className="h-9 w-9">
                      <AlignCenter size={16} />
                    </Button>
                    <Button type="button" onClick={() => {}} variant="outline" size="icon" className="h-9 w-9">
                      <AlignRight size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#e8e8e8]">
                  <Button type="button" onClick={() => {}} className="w-full bg-primary hover:brightness-110 text-white rounded-[6px] h-9">
                    AI 改写文案
                  </Button>
                </div>
              </div>
            ) : selectedElement === 'image' ? (
              // 选中图片元素时显示图片属性
              <div className="space-y-6">
                <Button type="button" onClick={() => {}} variant="outline" className="w-full h-10 gap-2">
                  <Upload size={16} />
                  <span>替换图片</span>
                </Button>
                
                <Accordion type="multiple" defaultValue={["crop", "adjust"]} className="w-full">
                  <AccordionItem value="crop" className="border-b border-[#e8e8e8]">
                    <AccordionTrigger className="text-[14px] font-bold text-[#333] hover:no-underline py-3 px-4 bg-[#FAFAFA]">
                      裁剪
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
                      <div className="grid grid-cols-3 gap-2">
                        <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px]">自由</Button>
                        <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px]">1:1</Button>
                        <Button type="button" onClick={() => {}} variant="outline" className="h-8 text-[12px] bg-[#FFF0F0] border-primary text-primary">16:9</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              // 选中装饰元素时显示装饰属性
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">颜色</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#FFFFFF', '#000000', '#E53935', '#1677ff', '#FFD54F', '#26a69a'].map((color) => (
                      <div 
                        key={color}
                        className="w-8 h-8 rounded-md cursor-pointer border-2 border-[#e8e8e8] hover:border-primary transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">大小</Label>
                  <Slider 
                    defaultValue={[50]} 
                    max={100} 
                    step={1} 
                    className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[14px] font-bold text-[#333]">旋转</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="0" className="h-8 text-[13px]" />
                    <span className="text-[13px] text-[#666]">°</span>
                  </div>
                </div>
              </div>
            )}
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
              <Button type="button" onClick={() => { if(!selectedElement) setSelectedElement('text'); setAiPrompt('帮我写一段关于此页面的专业文案'); }} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI写文案
              </Button>
              <Button type="button" onClick={() => { if(!selectedElement) setSelectedElement('image'); setAiPrompt('帮我更换一张更具科技感的背景图'); }} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI换图
              </Button>
              <Button type="button" onClick={() => { if(!selectedElement) setSelectedElement('shape'); setAiPrompt('智能剪辑当前页面的视觉元素'); }} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                智能剪辑
              </Button>
              <Button type="button" onClick={() => { if(!selectedElement) setSelectedElement('text'); setAiPrompt('为当前页面配一段深沉稳重的旁白'); }} className="bg-primary hover:brightness-110 text-white text-[12px] rounded-[6px] h-8 shadow-sm px-0">
                AI配音
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditorPage;
