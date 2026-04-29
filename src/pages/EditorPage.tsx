import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Image, Type, Sticker, Sparkles, Shuffle, Sliders, Volume2, MoreHorizontal,
  HelpCircle, Settings, Undo, Redo, Eye, Download, X, Bot, ArrowLeft,
  Layout, Plus, BarChart3, Table2, Film, Palette, SquareDashed, User,
  PenLine, Search, Send, Trash2, Move, RotateCcw, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Minus, Plus as PlusIcon, Music
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

/* ===== 阶段三：单页编辑模式 — 参考图5风格 ===== */

const EditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTool, setActiveTool] = useState('页面');
  const [selectedElement, setSelectedElement] = useState<'text' | 'image' | null>(null);
  const [aiInput, setAiInput] = useState('');
  const [showAiSearch, setShowAiSearch] = useState(false);

  const tools = [
    { icon: <Layout size={20} />, label: '页面' },
    { icon: <Image size={20} />, label: '模板' },
    { icon: <Sparkles size={20} />, label: '素材' },
    { icon: <BarChart3 size={20} />, label: '图表' },
    { icon: <PenLine size={20} />, label: '文本' },
    { icon: <Plus size={20} />, label: '插件' },
    { icon: <Settings size={20} />, label: '设置' },
    { icon: <HelpCircle size={20} />, label: '帮助' },
  ];

  const handleElementClick = (type: 'text' | 'image') => {
    setSelectedElement(type);
    setShowAiSearch(true);
  };

  const sidebarTools = ['插入', '文本', '形状', '图表', '表格', '媒体', '主题', '布局'];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans" style={{ fontFamily: "'PingFang SC','Microsoft YaHei','Helvetica Neue',sans-serif" }}>
      
      {/* ===== 左侧工具栏 ===== */}
      <div className="w-[60px] bg-white border-r border-gray-100 flex flex-col items-center py-3 shrink-0 z-20">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            onClick={() => setActiveTool(tool.label)}
            className={cn(
              "w-12 h-12 flex flex-col items-center justify-center rounded-lg mb-1 transition-all relative",
              activeTool === tool.label 
                ? "bg-red-50 text-primary" 
                : "text-gray-400 hover:text-primary hover:bg-red-50"
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
              <button key={label} type="button" className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-red-50 transition-all">
                {item.icon}
                <span className="text-[9px] mt-0.5">{label}</span>
              </button>
            ) : null;
          })}
        </div>
      </div>

      {/* ===== 主区域 ===== */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* 顶部工具栏 */}
        <header className="h-11 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate('/canvas')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft size={16} />
            </button>
            <nav className="flex items-center gap-1 text-xs text-gray-400">
              <button onClick={() => navigate('/')} className="hover:text-gray-600">文件</button>
              <span>/</span>
              <button onClick={() => navigate('/canvas')} className="hover:text-gray-600">我的项目</button>
              <span>/</span>
              <span className="text-gray-600 font-medium">第 {id} 页</span>
            </nav>
            <span className="flex items-center gap-1 text-[11px] text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              已保存
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* 编辑工具栏 */}
            <div className="hidden md:flex items-center gap-1 mr-4">
              {sidebarTools.map((label) => (
                <button key={label} type="button" className="px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-md transition-all">{label}</button>
              ))}
            </div>
            <button type="button" className="px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-1">
              <Bot size={14} className="text-primary" /> AI助手
            </button>
            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 text-gray-500">
              <Eye size={13} className="mr-1" />演示
            </Button>
            <Button type="button" size="sm" className="h-7 text-xs rounded-lg bg-primary hover:brightness-110 text-white shadow-sm ml-1">分享</Button>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ml-2">晶</div>
          </div>
        </header>

        {/* ===== 中间单页编辑器 ===== */}
        <main className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
          <div className="relative w-full max-w-[900px]">
            {/* 幻灯片缩放信息 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">幻灯片 {id}/8</span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" className="w-6 h-6 p-0 text-gray-400"><Minus size={12} /></Button>
                <span className="text-xs text-gray-500 font-mono">100%</span>
                <Button type="button" variant="ghost" size="sm" className="w-6 h-6 p-0 text-gray-400"><PlusIcon size={12} /></Button>
              </div>
            </div>

            {/* 幻灯片内容 — 参考图5红色调 */}
            <div 
              className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#E53935] to-[#C62828] cursor-pointer"
              style={{ aspectRatio: '16/9' }}
              onClick={() => { setSelectedElement(null); setShowAiSearch(false); }}
            >
              {/* 可点击的文字元素 */}
              <div 
                className={cn(
                  "absolute top-1/4 left-1/2 -translate-x-1/2 text-center cursor-pointer p-4 rounded-lg transition-all",
                  selectedElement === 'text' ? 'ring-2 ring-primary ring-offset-2 ring-offset-red-900/50' : 'hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-red-900/30'
                )}
                onClick={(e) => { e.stopPropagation(); handleElementClick('text'); }}
              >
                <h1 className="text-white font-extrabold text-3xl md:text-4xl drop-shadow-lg">
                  AI赋能智能办公新时代
                </h1>
                <p className="text-white/80 text-sm md:text-base mt-3 drop-shadow-md">
                  智能驱动·高效协同·创新未来
                </p>
              </div>

              {/* 可点击的装饰元素 */}
              <div 
                className={cn(
                  "absolute bottom-6 left-1/2 -translate-x-1/2 text-center cursor-pointer px-4 py-1.5 rounded-lg transition-all",
                  selectedElement === 'image' ? 'ring-2 ring-primary ring-offset-2 ring-offset-red-900/50' : 'hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-red-900/30'
                )}
                onClick={(e) => { e.stopPropagation(); handleElementClick('image'); }}
              >
                <p className="text-white/60 text-xs">
                  AI智能幻灯片工作室 | 2024年6月
                </p>
              </div>

              {/* 选中元素时调整手柄 */}
              {selectedElement && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white border border-primary rounded-sm -translate-x-1/2 -translate-y-1/2 shadow" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white border border-primary rounded-sm translate-x-1/2 -translate-y-1/2 shadow" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-primary rounded-sm -translate-x-1/2 translate-y-1/2 shadow" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-primary rounded-sm translate-x-1/2 translate-y-1/2 shadow" />
                  {/* 删除按钮 */}
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedElement(null); setShowAiSearch(false); }}
                    className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-all z-10"
                  >
                    <X size={12} />
                  </button>
                </>
              )}
            </div>

            {/* AI搜索框 - 选中元素时弹出 */}
            {showAiSearch && (
              <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={16} className="text-primary" />
                    <span className="text-xs font-semibold text-[#333]">AI 智能替换</span>
                    <span className="text-[10px] text-gray-400">已选：{selectedElement === 'text' ? '文字元素' : '图片元素'}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="告诉我你想要的需求"
                        className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 pr-10 outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <Button type="button" size="sm" className="h-[38px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 shadow-sm">
                      <Send size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 编辑提示 */}
            {!selectedElement && (
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">点击幻灯片内的文字或元素进行编辑</p>
              </div>
            )}
          </div>
        </main>

        {/* ===== 底部AI提示栏 ===== */}
        <div className="border-t border-gray-100 bg-white px-6 py-3 shrink-0">
          <div className="max-w-[1200px] mx-auto flex items-center gap-3">
            <Bot size={18} className="text-primary shrink-0" />
            <div className="flex-1 relative">
              <input 
                type="text"
                placeholder="告诉 AI 你想做什么..."
                className="w-full text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 pr-8 outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-gray-400"
              />
              <Send size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
            <div className="hidden lg:flex items-center gap-2">
              {['帮我优化整体排版', '统一页面风格', '为第 3 页增加案例'].map((action) => (
                <button key={action} type="button" className="text-[11px] whitespace-nowrap px-2.5 py-1.5 rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all border border-gray-100">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 右侧属性面板 ===== */}
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

export default EditorPage;
