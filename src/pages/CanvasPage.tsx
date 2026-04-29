import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image, Type, Sticker, Sparkles, Shuffle, Sliders, 
  HelpCircle, Settings, Undo, Redo, Eye, Download, X, Bot, 
  Layout, Plus, BarChart3, Table2, Film, Palette, SquareDashed, 
  PenLine, Send, FileText, Grid3X3, Music, ZoomIn, ZoomOut,
  Maximize2, MessageSquare, ClipboardList, ChevronRight,
  Search, Globe, FileUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/* ===== AI智能幻灯片工作室 — 完整编辑器界面 ===== */

// 8页幻灯片数据
const slides = [
  { id: 1, title: 'AI赋能智能办公新时代', subtitle: '', gradient: 'from-orange-500 to-orange-400' },
  { id: 2, title: '内容概览', subtitle: 'CONTENTS', gradient: 'from-blue-500 to-blue-400' },
  { id: 3, title: '人工智能技术发展现状', subtitle: 'TECHNOLOGY STATUS', gradient: 'from-purple-500 to-purple-400' },
  { id: 4, title: '核心功能介绍', subtitle: 'CORE FEATURES', gradient: 'from-red-500 to-red-400' },
  { id: 5, title: '应用场景分析', subtitle: 'APPLICATIONS', gradient: 'from-teal-500 to-teal-400' },
  { id: 6, title: '数据趋势与洞察', subtitle: 'DATA INSIGHTS', gradient: 'from-[#E53935] to-red-400' },
  { id: 7, title: '解决方案与优势', subtitle: 'SOLUTIONS', gradient: 'from-rose-700 to-rose-500' },
  { id: 8, title: '携手共创未来', subtitle: 'FUTURE OUTLOOK', gradient: 'from-amber-500 to-yellow-400' },
];

/* 左侧菜单项 */
const sidebarItems = [
  { icon: <Layout size={20} />, label: '页面', key: 'page' },
  { icon: <Grid3X3 size={20} />, label: '模板', key: 'template' },
  { icon: <Image size={20} />, label: '素材', key: 'material' },
  { icon: <BarChart3 size={20} />, label: '图表', key: 'chart' },
  { icon: <FileText size={20} />, label: '数据', key: 'data' },
  { icon: <Plus size={20} />, label: '插件', key: 'plugin' },
  { icon: <Settings size={20} />, label: '设置', key: 'settings' },
  { icon: <HelpCircle size={20} />, label: '帮助', key: 'help' },
];

/* 顶部工具栏按钮 */
const toolbarItems = ['插入', '文本', '形状', '图表', '表格', '媒体', '主题', '布局'];

/* 布局选项 */
const layoutOptions = [
  { id: 1, desc: '标题+正文' },
  { id: 2, desc: '两栏' },
  { id: 3, desc: '三栏' },
  { id: 4, desc: '图片+文字' },
  { id: 5, desc: '全图' },
];

/* 快捷AI操作 */
const aiQuickActions = [
  '帮我优化整体排版',
  '统一页面风格',
  '为第3页增加案例',
  '生成演讲备注',
  '将全文扩写20%',
];

const EditorCanvas = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('page');
  const [selectedSlide, setSelectedSlide] = useState<number | null>(1);
  const [selectedLayout, setSelectedLayout] = useState(1);
  const [aiInput, setAiInput] = useState('');

  return (
    <div className="h-screen w-full bg-[#F8F9FA] flex flex-col overflow-hidden font-sans" 
         style={{ fontFamily: "'PingFang SC','Microsoft YaHei','Helvetica Neue',sans-serif" }}>
      
      {/* ===== 主布局：左侧边栏 + 中间区 + 右侧面板 ===== */}
      <div className="flex flex-1 min-h-0">

        {/* ===== ① 左侧边栏 ===== */}
        <aside className="w-[68px] bg-white border-r border-gray-100 flex flex-col items-center py-3 shrink-0 z-10">
          {/* 顶部Logo */}
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm mb-6 shadow-sm">
            创
          </div>

          {/* 菜单项 */}
          <nav className="flex flex-col items-center gap-0.5 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveMenu(item.key)}
                className={cn(
                  "w-[52px] h-[52px] flex flex-col items-center justify-center rounded-xl transition-all relative group",
                  activeMenu === item.key
                    ? "bg-red-50 text-primary"
                    : "text-gray-400 hover:text-primary hover:bg-red-50/50"
                )}
              >
                {activeMenu === item.key && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
                <div className={cn(
                  "transition-transform duration-200",
                  activeMenu === item.key ? "scale-105" : "group-hover:scale-105"
                )}>
                  {item.icon}
                </div>
                <span className={cn(
                  "text-[9px] mt-0.5 transition-colors",
                  activeMenu === item.key ? "text-primary font-medium" : "text-gray-400 group-hover:text-primary"
                )}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ===== ② 中间编辑区 ===== */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* ---- 顶部工具栏 ---- */}
          <header className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0 shadow-sm">
            {/* 左侧品牌 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white font-bold text-[10px]">创</div>
                <span className="text-xs font-semibold text-[#333] whitespace-nowrap">AI智能幻灯片工作室</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                自动保存已开启
              </div>
            </div>

            {/* 中间工具栏 */}
            <div className="hidden md:flex items-center gap-0.5 bg-gray-50/80 px-2 py-1 rounded-lg">
              {toolbarItems.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="px-3 py-1.5 text-xs text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm rounded-md transition-all whitespace-nowrap"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 右侧按钮 */}
            <div className="flex items-center gap-2">
              <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary bg-red-50 hover:bg-red-100 rounded-lg transition-all font-medium">
                <Bot size={14} />
                AI智能助手
              </button>
              <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 text-gray-500 bg-white hover:bg-gray-50">
                <Eye size={13} className="mr-1" />
                演示
              </Button>
              <Button type="button" size="sm" className="h-7 text-xs rounded-lg bg-primary hover:brightness-110 text-white shadow-sm font-medium">
                分享
              </Button>
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">晶</div>
            </div>
          </header>

          {/* ---- 幻灯片网格区 ---- */}
          <main className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
            <div className="max-w-[1100px] mx-auto">
              {/* 标题行 */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#333]">幻灯片</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">1/8</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                    <Undo size={14} />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                    <Redo size={14} />
                  </Button>
                  <div className="w-px h-5 bg-gray-200 mx-1" />
                  <Button type="button" size="sm" className="h-7 text-xs rounded-lg bg-primary hover:brightness-110 text-white shadow-sm px-4 font-medium">
                    <Download size={13} className="mr-1.5" />
                    导出
                  </Button>
                </div>
              </div>

              {/* 幻灯片网格 2行×4列 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    onClick={() => setSelectedSlide(slide.id)}
                    className={cn(
                      "group cursor-pointer rounded-xl overflow-hidden bg-white transition-all duration-200",
                      selectedSlide === slide.id 
                        ? "ring-2 ring-primary ring-offset-2 shadow-md" 
                        : "hover:-translate-y-1 hover:shadow-lg",
                    )}
                    style={{ boxShadow: selectedSlide === slide.id ? '0 4px 16px rgba(229,57,53,0.15)' : '0 1px 4px rgba(0,0,0,0.06)' }}
                  >
                    {/* 16:9 缩略图 */}
                    <div className={cn("bg-gradient-to-br relative w-full", slide.gradient)} style={{ paddingBottom: '56.25%' }}>
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        {/* 序号 */}
                        <div className="flex items-start">
                          <span className="w-6 h-6 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                            {slide.id}
                          </span>
                        </div>
                        {/* 标题 */}
                        <div>
                          <p className="text-[11px] font-bold text-white leading-tight drop-shadow-sm">{slide.title}</p>
                          {slide.subtitle && (
                            <p className="text-[8px] text-white/60 mt-0.5 tracking-wider">{slide.subtitle}</p>
                          )}
                        </div>
                      </div>
                      {/* 悬浮操作 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <Button 
                          type="button" 
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); navigate(`/editor/${slide.id}`); }}
                          className="opacity-0 group-hover:opacity-100 transition-all bg-white/90 text-[#333] hover:bg-white rounded-lg text-[10px] px-3 py-1 shadow-md font-medium"
                        >
                          编辑此页面
                        </Button>
                      </div>
                    </div>
                    {/* 底部 */}
                    <div className="p-2.5 bg-white">
                      <p className="text-xs font-medium text-[#333] truncate">{slide.title}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">幻灯片 {slide.id}/8</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* ---- 底部AI指令栏 ---- */}
          <div className="bg-white border-t border-gray-100 px-6 py-3 shrink-0">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-100 p-2.5">
                <Bot size={20} className="text-primary shrink-0" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="告诉 AI 你想做什么，例如：'为第 6 页增加一张数据趋势图并优化文案'"
                    className="w-full text-xs bg-transparent border-none outline-none placeholder:text-gray-400 py-1"
                  />
                </div>
                <button type="button" className="w-8 h-8 rounded-full bg-primary hover:brightness-110 text-white flex items-center justify-center shadow-sm transition-all shrink-0">
                  <Send size={14} />
                </button>
              </div>
              {/* 快捷操作 */}
              <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-0.5">
                {aiQuickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-lg bg-white text-gray-500 hover:bg-red-50 hover:text-primary transition-all border border-gray-100"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ---- 底部状态栏 ---- */}
          <footer className="h-8 bg-white border-t border-gray-100 flex items-center justify-between px-4 text-[11px] text-gray-400 shrink-0">
            <div className="flex items-center gap-4">
              <span>幻灯片 1/8</span>
              <span className="flex items-center gap-1">
                <Globe size={12} />
                中文（简体）
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="hover:text-gray-600 transition-colors flex items-center gap-1">
                <ClipboardList size={12} />
                备注
              </button>
              <button type="button" className="hover:text-gray-600 transition-colors flex items-center gap-1">
                <MessageSquare size={12} />
                批注
              </button>
              <div className="w-px h-3 bg-gray-200" />
              <button type="button" className="hover:text-gray-600 transition-colors">
                <ZoomOut size={12} />
              </button>
              <span className="text-xs font-mono text-gray-500">100%</span>
              <button type="button" className="hover:text-gray-600 transition-colors">
                <ZoomIn size={12} />
              </button>
              <button type="button" className="hover:text-gray-600 transition-colors">
                <Maximize2 size={12} />
              </button>
              <button type="button" className="hover:text-gray-600 transition-colors">
                <HelpCircle size={12} />
              </button>
            </div>
          </footer>
        </div>

        {/* ===== ③ 右侧属性面板 ===== */}
        <aside className="w-[300px] bg-white border-l border-gray-100 overflow-y-auto shrink-0 hidden lg:block">
          <div className="p-5 space-y-6">

            {/* 页面属性 */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#333]">页面属性</h3>
                <button type="button" className="text-gray-300 hover:text-gray-500 transition-colors">
                  <X size={14} />
                </button>
              </div>

              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">页面布局</h4>
              <div className="grid grid-cols-5 gap-2">
                {layoutOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedLayout(opt.id)}
                    className={cn(
                      "aspect-[4/3] rounded-lg border-2 transition-all p-1 flex items-center justify-center",
                      selectedLayout === opt.id
                        ? "border-primary bg-red-50"
                        : "border-gray-100 bg-gray-50 hover:border-primary/40 hover:bg-red-50/30"
                    )}
                  >
                    <div className="w-full h-full rounded-[3px] bg-white overflow-hidden">
                      <div className={cn(
                        "h-1/3",
                        opt.id === 1 ? "bg-gray-200" : 
                        opt.id === 2 ? "bg-gray-200 w-1/2" : 
                        opt.id === 3 ? "bg-gray-200 w-1/2" : 
                        opt.id === 4 ? "bg-gray-200 w-2/3" : "bg-gray-200"
                      )} />
                      <div className={cn(
                        "h-2/3 bg-gray-100",
                        opt.id === 2 ? "w-1/2" : opt.id === 3 ? "w-1/2 ml-auto" : ""
                      )} />
                    </div>
                  </button>
                ))}
              </div>
              <button type="button" className="w-full mt-2 text-[11px] text-primary font-medium py-1.5 border border-dashed border-primary/30 rounded-lg hover:bg-red-50 transition-all">
                + 自定义布局
              </button>
            </section>

            {/* 分隔线 */}
            <div className="border-t border-gray-100" />

            {/* AI改稿 */}
            <section>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">AI改稿</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '润色', icon: <PenLine size={16} />, desc: '优化文案表达' },
                  { label: '扩写', icon: <FileText size={16} />, desc: '丰富内容细节' },
                  { label: '缩写', icon: <Shuffle size={16} />, desc: '精简核心要点' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-red-50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-red-100 group-hover:text-primary transition-all">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-600 group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="text-[9px] text-gray-400">{item.desc}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 分隔线 */}
            <div className="border-t border-gray-100" />

            {/* 一键换图 */}
            <section>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">一键换图</h4>
              <div className="space-y-2.5">
                <button type="button" className="w-full flex items-center justify-between text-xs py-2.5 px-4 rounded-xl bg-red-50 text-primary font-medium hover:bg-red-100 transition-all">
                  <span className="flex items-center gap-2"><Sparkles size={14} />智能推荐图片</span>
                  <ChevronRight size={14} />
                </button>
                <button type="button" className="w-full flex items-center justify-between text-xs py-2.5 px-4 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200 transition-all">
                  <span className="flex items-center gap-2"><FileUp size={14} />本地上传图片</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </section>

            {/* 分隔线 */}
            <div className="border-t border-gray-100" />

            {/* 样式调整 */}
            <section>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">样式调整</h4>
              <div className="space-y-1">
                {[
                  { label: '主题风格', icon: <Palette size={15} /> },
                  { label: '配色方案', icon: <Shuffle size={15} /> },
                  { label: '字体设置', icon: <Type size={15} /> },
                  { label: '背景设置', icon: <Image size={15} /> },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="w-full flex items-center justify-between text-xs py-2.5 px-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-primary transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-gray-400 group-hover:text-primary transition-colors">{item.icon}</span>
                      {item.label}
                    </span>
                    <ChevronRight size={13} className="text-gray-300 group-hover:text-primary/50" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EditorCanvas;
