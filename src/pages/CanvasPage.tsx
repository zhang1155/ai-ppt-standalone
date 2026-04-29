import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image, Type, Sticker, Sparkles, Shuffle, Sliders, Volume2, MoreHorizontal,
  HelpCircle, Settings, Undo, Redo, Eye, Download, X, Bot, ArrowLeft,
  Layout, Plus, BarChart3, Table2, Film, Palette, SquareDashed, User,
  PenLine, AlignLeft, Bold, Italic, Search, Send, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ===== 阶段二：PPT画布总览 — 参考图2/3/4风格 ===== */

// 模拟PPT幻灯片数据（8页）
const slides = [
  { id: 1, title: 'AI赋能智能办公新时代', gradient: 'from-orange-500 to-orange-400', subtitle: '智能驱动·高效协同·创新未来' },
  { id: 2, title: '内容概览', gradient: 'from-blue-500 to-blue-400', subtitle: '目录与章节概览' },
  { id: 3, title: '人工智能技术发展现状', gradient: 'from-purple-500 to-purple-400', subtitle: '技术发展历程' },
  { id: 4, title: '核心功能介绍', gradient: 'from-red-500 to-red-400', subtitle: '功能亮点' },
  { id: 5, title: '应用场景分析', gradient: 'from-teal-500 to-teal-400', subtitle: '场景化应用' },
  { id: 6, title: '数据趋势与洞察', gradient: 'from-[#E53935] to-red-400', subtitle: '数据分析' },
  { id: 7, title: '解决方案与优势', gradient: 'from-rose-700 to-rose-500', subtitle: '核心优势' },
  { id: 8, title: '携手共创未来', gradient: 'from-yellow-500 to-amber-400', subtitle: '展望未来' },
];

const SlideThumbnail = ({ slide, onClick }: { slide: typeof slides[0], onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer rounded-lg overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
  >
    {/* 缩略图区 - 16:9 */}
    <div className={cn("bg-gradient-to-br relative w-full", slide.gradient)} style={{ paddingBottom: '56.25%' }}>
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* 序号标记 */}
        <div className="flex items-start justify-between">
          <span className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {slide.id}
          </span>
        </div>
        {/* 标题（微缩） */}
        <div className="text-white">
          <p className="text-xs font-bold leading-tight drop-shadow-sm">{slide.title}</p>
          <p className="text-[9px] text-white/70 mt-0.5">{slide.subtitle}</p>
        </div>
      </div>
      {/* 悬浮操作按钮 */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
        <Button 
          type="button" 
          size="sm"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="opacity-0 group-hover:opacity-100 transition-all bg-white/90 text-[#333] hover:bg-white rounded-lg text-xs px-4 py-1.5 shadow-md"
        >
          编辑此页面
        </Button>
      </div>
    </div>
    {/* 底部标题 */}
    <div className="p-2.5 bg-white">
      <p className="text-xs font-semibold text-[#333] truncate">{slide.title}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">幻灯片 {slide.id}/8</p>
    </div>
  </div>
);

const CanvasPage = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState('素材');

  const tools = [
    { icon: <Layout size={20} />, label: '页面' },
    { icon: <Image size={20} />, label: '模板' },
    { icon: <Sparkles size={20} />, label: '素材' },
    { icon: <BarChart3 size={20} />, label: '图表' },
    { icon: <FileText size={20} />, label: '数据' },
    { icon: <Plus size={20} />, label: '插件' },
    { icon: <Settings size={20} />, label: '设置' },
    { icon: <HelpCircle size={20} />, label: '帮助' },
  ];

  // 快捷AI操作
  const aiActions = ['帮我优化整体排版', '统一页面风格', '为第 3 页增加案例', '生成演讲备注', '将全文扩写 20%'];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans" style={{ fontFamily: "'PingFang SC','Microsoft YaHei','Helvetica Neue',sans-serif" }}>
      
      {/* ===== 左侧工具栏（参考图2-4） ===== */}
      <div className="w-[60px] bg-[#2D2D2D] flex flex-col items-center py-3 shrink-0 z-20">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            onClick={() => setActiveTool(tool.label)}
            className={cn(
              "w-12 h-12 flex flex-col items-center justify-center rounded-lg mb-1 transition-all relative",
              activeTool === tool.label 
                ? "bg-[#3A3A3A] text-primary" 
                : "text-gray-400 hover:text-gray-200 hover:bg-[#3A3A3A]"
            )}
          >
            {activeTool === tool.label && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />}
            {tool.icon}
            <span className="text-[9px] mt-0.5">{tool.label}</span>
          </button>
        ))}
        <div className="mt-auto flex flex-col items-center gap-1">
          {['帮助', '设置'].map((label) => {
            const item = tools.find(t => t.label === label);
            return item ? (
              <button key={label} type="button" className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#3A3A3A] transition-all">
                {item.icon}
                <span className="text-[9px] mt-0.5">{label}</span>
              </button>
            ) : null;
          })}
        </div>
      </div>

      {/* ===== 右侧主区域 ===== */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 顶部工具栏 - 参考图2-4风格 */}
        <header className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* 左侧面包屑 */}
            <nav className="flex items-center gap-1 text-xs text-gray-400">
              <button onClick={() => navigate('/')} className="hover:text-gray-600 transition-colors">文件</button>
              <span className="mx-1">/</span>
              <span className="text-gray-600">AI赋能智能办公新时代</span>
            </nav>
            {/* 自动保存状态 */}
            <span className="flex items-center gap-1 text-[11px] text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              自动保存已开启
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* 编辑工具栏 - 居中 */}
            <div className="hidden md:flex items-center gap-1 mx-6 px-4 py-1 rounded-lg bg-gray-50">
              {[
                { icon: <Plus size={15} />, label: '插入' },
                { icon: <Type size={15} />, label: '文本' },
                { icon: <SquareDashed size={15} />, label: '形状' },
                { icon: <BarChart3 size={15} />, label: '图表' },
                { icon: <Table2 size={15} />, label: '表格' },
                { icon: <Film size={15} />, label: '媒体' },
                { icon: <Palette size={15} />, label: '主题' },
                { icon: <Layout size={15} />, label: '布局' },
              ].map((item) => (
                <button key={item.label} type="button" className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 hover:bg-white hover:text-gray-700 rounded-md transition-all whitespace-nowrap">
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* 右侧按钮 */}
            <button type="button" className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-1.5">
              <Bot size={15} className="text-primary" />
              <span>AI智能助手</span>
            </button>
            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 text-gray-500 ml-1">
              <Eye size={14} className="mr-1" />
              演示
            </Button>
            <Button type="button" size="sm" className="h-7 text-xs rounded-lg bg-primary hover:brightness-110 text-white ml-1 shadow-sm">
              分享
            </Button>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ml-2">晶</div>
          </div>
        </header>

        {/* ===== 中间主内容区 ===== */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1200px] mx-auto">
            {/* 幻灯片标题 */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-[#333]">幻灯片 1/8</h2>
                <p className="text-xs text-gray-400 mt-0.5">共生成 8 页幻灯片</p>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs rounded-lg border-gray-200">
                  <Undo size={14} className="mr-1" />
                  撤销
                </Button>
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs rounded-lg border-gray-200">
                  <Redo size={14} className="mr-1" />
                  重做
                </Button>
                <Button type="button" size="sm" className="h-8 text-xs rounded-lg bg-primary hover:brightness-110 text-white shadow-sm">
                  导出
                </Button>
                <Button type="button" size="sm" className="h-8 text-xs rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                  <Download size={14} className="mr-1" />
                  下载
                </Button>
              </div>
            </div>

            {/* 幻灯片网格 - 参考图2/3/4布局 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {slides.map((slide) => (
                <SlideThumbnail 
                  key={slide.id} 
                  slide={slide} 
                  onClick={() => navigate(`/editor/${slide.id}`)}
                />
              ))}
            </div>
          </div>
        </main>

        {/* ===== 底部AI提示栏（参考图2/3/4） ===== */}
        <div className="border-t border-gray-100 bg-white px-6 py-3 shrink-0">
          <div className="max-w-[1200px] mx-auto flex items-center gap-3">
            <Bot size={18} className="text-primary shrink-0" />
            <div className="flex-1 relative">
              <input 
                type="text"
                placeholder="告诉 AI 你想做什么，例如：'为第 6 页增加一张数据趋势图并优化文案'"
                className="w-full text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 pr-8 outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <Send size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
            {/* 快捷操作按钮 */}
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
              {aiActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="text-[11px] whitespace-nowrap px-2.5 py-1.5 rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all border border-gray-100"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ===== 右侧属性面板（图2/3/4风格） ===== */}
      <aside className="w-[280px] bg-white border-l border-gray-100 shrink-0 overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#333]">页面属性</h3>
          <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* 页面布局 */}
          <section>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">页面布局</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-[4/3] rounded-md border border-gray-200 bg-gray-50 hover:border-primary/50 cursor-pointer transition-all p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-sm bg-gray-100" style={{ clipPath: i === 1 ? 'inset(0)' : i === 2 ? 'polygon(0 0,100% 0,100% 50%,0 50%)' : 'polygon(0 0,70% 0,70% 100%,0 100%)' }} />
                </div>
              ))}
            </div>
            <button type="button" className="w-full mt-2 text-xs text-primary font-medium py-1.5 border border-dashed border-primary/30 rounded-lg hover:bg-red-50 transition-all">
              + 自定义布局
            </button>
          </section>

          {/* AI改稿 */}
          <section>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">AI改稿</h4>
            <div className="flex gap-2">
              {[
                { label: '润色', desc: '优化文案表达' },
                { label: '扩写', desc: '丰富内容细节' },
                { label: '缩写', desc: '精简核心要点' },
              ].map(item => (
                <button key={item.label} type="button" className="flex-1 p-2 rounded-lg border border-gray-200 hover:border-primary/40 hover:bg-red-50 transition-all text-center group">
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-primary">{item.label}</span>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 一键换图 */}
          <section>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">一键换图</h4>
            <div className="space-y-2">
              <button type="button" className="w-full text-xs py-2 rounded-lg bg-red-50 text-primary font-medium hover:bg-red-100 transition-all">智能推荐图片</button>
              <button type="button" className="w-full text-xs py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">本地上传图片</button>
            </div>
          </section>

          {/* 样式调整 */}
          <section>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">样式调整</h4>
            <div className="space-y-2">
              {[
                { label: '主题风格', icon: <Palette size={14} /> },
                { label: '配色方案', icon: <Shuffle size={14} /> },
                { label: '字体设置', icon: <Type size={14} /> },
                { label: '背景设置', icon: <Image size={14} /> },
              ].map(item => (
                <button key={item.label} type="button" className="w-full flex items-center justify-between text-xs py-2 px-3 rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200 transition-all">
                  <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                  <span className="text-gray-300">&gt;</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default CanvasPage;
