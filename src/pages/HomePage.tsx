import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, FileText, Palette, Image, ArrowRight, Star,
  Zap, Shield, Clock, Lock, ChevronRight, ChevronLeft,
  Upload, FileUp, SlidersHorizontal, FileDown, Mic,
  Layout, Wand2, BarChart3, HelpCircle, MessageSquare,
  Settings, Users, History, Home, PlusCircle,
  LayoutTemplate, Trash2, Search, Globe, Download
} from 'lucide-react';

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="group bg-white rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 hover:border-red-100 hover:shadow-md" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1a1a2e] text-sm">{title}</h4>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const tabs = [
  { id: 'text', label: '一句话做PPT', icon: Sparkles },
  { id: 'word', label: 'Word转PPT', icon: FileText },
  { id: 'beautify', label: '美化PPT', icon: Palette },
];

const actionButtons: Record<string, { icon: React.ReactNode; label: string }[]> = {
  text: [
    { icon: <FileUp size={14} />, label: '上传文件' },
    { icon: <Upload size={14} />, label: '导入大纲' },
    { icon: <SlidersHorizontal size={14} />, label: '选择模板' },
  ],
  word: [
    { icon: <FileUp size={14} />, label: '从文件导入' },
    { icon: <Upload size={14} />, label: '上传参考' },
    { icon: <SlidersHorizontal size={14} />, label: '尺寸设置' },
    { icon: <FileDown size={14} />, label: '页数设置' },
  ],
  beautify: [
    { icon: <FileUp size={14} />, label: '从文件导入' },
    { icon: <Upload size={14} />, label: '上传参考' },
    { icon: <SlidersHorizontal size={14} />, label: '尺寸设置' },
    { icon: <FileDown size={14} />, label: '页数设置' },
  ],
};

const hotScenes = ['毕业答辩', '产品发布', '工作汇报', '市场分析', '述职竞聘', '商业计划书'];

const slides = [
  { type: 'title', title: '新品发布会PPT', subtitle: '科技引领未来' },
  { type: 'agenda', title: '目录', subtitle: '行业趋势 / 产品亮点 / 市场策略 / 未来展望' },
  { type: 'content', title: '行业趋势分析', subtitle: '2025年市场规模突破万亿，AI渗透率持续提升' },
  { type: 'chart', title: '数据增长', subtitle: '年度增长率达35%，远超行业平均水平' },
  { type: 'image', title: '产品展示', subtitle: '全新一代智能终端' },
  { type: 'content', title: '核心优势', subtitle: '技术壁垒 / 成本优势 / 生态整合' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/canvas');
    }, 2000);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: '首页', active: true },
    { icon: <PlusCircle size={20} />, label: 'AI生成PPT' },
    { icon: <LayoutTemplate size={20} />, label: '模板中心' },
    { icon: <FileText size={20} />, label: '我的文档' },
    { icon: <History size={20} />, label: '历史记录' },
    { icon: <Trash2 size={20} />, label: '回收站' },
    { icon: <Users size={20} />, label: '团队协作' },
  ];

  const bottomMenu = [
    { icon: <MessageSquare size={18} />, label: '消息' },
    { icon: <HelpCircle size={18} />, label: '帮助中心' },
    { icon: <Settings size={18} />, label: '设置' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif" }}>
      {/* ===== Loading Overlay ===== */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" size={28} />
          </div>
          <p className="text-white text-xl font-bold tracking-wider">AI正在为您生成PPT...</p>
          <p className="text-white/50 text-sm mt-2">智能分析中，请稍候</p>
        </div>
      )}

      {/* ===== 左侧导航栏 ===== */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-50 transition-all duration-300 flex flex-col ${collapsed ? 'w-[68px]' : 'w-[200px]'}`}>
        {/* Logo */}
        <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'gap-3'} mb-2 pt-5`}>
          <div className="w-[38px] h-[38px] rounded-xl bg-primary flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-sm shadow-red-200">
            创
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-[17px] text-[#1a1a2e] tracking-tight">创视PPT</span>
              <span className="text-[10px] text-primary font-medium bg-red-50 px-1.5 py-0.5 rounded mt-0.5 inline-block w-fit">AI 智能生成</span>
            </div>
          )}
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 mt-1">
          {menuItems.map((item, i) => (
            <div key={i}
              className={`flex items-center gap-3 cursor-pointer transition-all relative group h-[42px] ${
                item.active
                  ? 'bg-red-50 text-primary font-semibold border-l-[3px] border-primary'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              } ${collapsed ? 'justify-center px-0 mx-1 rounded-lg' : 'px-5'}`}
              onClick={() => item.active && navigate('/')}
            >
              <div className={`shrink-0 ${item.active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </div>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </div>
          ))}

          {/* 开始生成按钮 */}
          <div className={`mt-5 ${collapsed ? 'px-2' : 'px-4'}`}>
            <button
              onClick={handleGenerate}
              className={`w-full bg-gradient-to-r from-primary to-red-600 hover:brightness-110 text-white font-bold rounded-xl py-[10px] shadow-md shadow-red-200 transition-all flex items-center justify-center gap-2 ${collapsed ? 'h-10' : ''}`}
            >
              {collapsed ? <PlusCircle size={20} /> : <><PlusCircle size={18} /> 开始生成</>}
            </button>
          </div>
        </nav>

        {/* 底部区域 */}
        <div className="border-t border-gray-100">
          <div className="py-2">
            {bottomMenu.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 py-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors ${collapsed ? 'justify-center' : 'px-5'}`}>
                {item.icon}
                {!collapsed && <span className="text-xs">{item.label}</span>}
              </div>
            ))}
          </div>
          <div className={`flex items-center gap-3 p-4 border-t border-gray-50 ${collapsed ? 'justify-center' : 'px-5'}`}>
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm">
              晶
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">晶晶</p>
                <p className="text-[10px] text-gray-400">免费版用户</p>
              </div>
            )}
          </div>
        </div>

        {/* 折叠按钮 */}
        <button
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* ===== 主内容区 ===== */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-[200px]'}`}>
        <div className="max-w-[900px] mx-auto px-8 py-10">

          {/* ===== 顶部标题区 ===== */}
          <section className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-50 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} />
              AI 驱动 · 智能排版
            </div>
            <h1 className="text-[34px] font-black tracking-tight text-[#1a1a2e] leading-tight">
              一句话 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-500">做PPT</span>
            </h1>
            <p className="text-[15px] text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
              输入主题和需求，AI 帮你快速生成专业、美观的演示文稿
            </p>
          </section>

          {/* ===== 核心输入区 ===== */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
              {/* Tab切换 */}
              <div className="flex justify-center mb-5">
                <div className="inline-flex bg-gray-50 p-1 rounded-xl gap-0.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon size={15} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 输入框 + 生成按钮 */}
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="请输入你想要PPT主题和内容，例如：人工智能发展现状与趋势..."
                      className="w-full min-h-[90px] text-sm p-4 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 leading-relaxed"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-1">{inputText.length}/200</span>
                  </div>

                  {/* 快捷操作按钮 */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {(actionButtons[activeTab] || actionButtons.text).map((btn, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                          {btn.icon}
                          {btn.label}
                        </button>
                      ))}
                    </div>
                    {/* 麦克风 */}
                    <button className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:brightness-110 transition-all">
                      <Mic size={16} />
                    </button>
                  </div>

                  {/* 热门场景 */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400">热门场景：</span>
                    {hotScenes.map((scene) => (
                      <span
                        key={scene}
                        className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-500 bg-white cursor-pointer hover:border-primary/40 hover:text-primary hover:bg-red-50/30 transition-all"
                      >
                        {scene}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={!inputText.trim()}
                  className="shrink-0 bg-gradient-to-r from-primary to-red-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-7 py-[18px] shadow-lg shadow-red-200 transition-all flex items-center gap-2 text-base"
                >
                  生成
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* ===== 快捷功能 ===== */}
          <section className="mb-8">
            <div className="grid grid-cols-6 gap-3">
              {[
                { icon: <Wand2 size={20} />, label: 'AI大纲', color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-500' },
                { icon: <Layout size={20} />, label: '智能排版', color: 'from-blue-50 to-blue-100', iconColor: 'text-blue-500' },
                { icon: <Palette size={20} />, label: '一键换肤', color: 'from-green-50 to-green-100', iconColor: 'text-green-500' },
                { icon: <BarChart3 size={20} />, label: '智能图表', color: 'from-orange-50 to-orange-100', iconColor: 'text-orange-500' },
                { icon: <LayoutTemplate size={20} />, label: '模板推荐', color: 'from-pink-50 to-pink-100', iconColor: 'text-pink-500' },
                { icon: <Mic size={20} />, label: '语音输入', color: 'from-red-50 to-red-100', iconColor: 'text-primary' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl bg-white border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== 作品展示区 ===== */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#1a1a2e]">推荐模板</h2>
                <span className="text-xs bg-primary text-white px-2.5 py-0.5 rounded-full font-medium">全部</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['工作汇报', '述职竞聘', '营销推广', '党政风采', '毕业答辩'].map((cat, i) => (
                  <span
                    key={cat}
                    className={`text-xs whitespace-nowrap cursor-pointer px-3 py-1 rounded-full border transition-all ${
                      i === 0 ? 'border-primary text-primary bg-red-50' : 'border-gray-200 text-gray-500 hover:text-primary hover:border-primary/40'
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {slides.map((slide, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => navigate('/canvas')}>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden border border-gray-100 transition-all group-hover:shadow-lg group-hover:-translate-y-1" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className={`w-full h-full p-5 flex flex-col justify-center relative ${
                      i % 2 === 0
                        ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]'
                        : 'bg-gradient-to-br from-primary via-red-600 to-red-800'
                    }`}>
                      {i % 2 === 0 ? (
                        <>
                          <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/5" />
                          <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/5" />
                          <span className="text-white/30 text-[10px] font-medium mb-2">{slide.type.toUpperCase()}</span>
                          <h3 className="text-white font-bold text-sm leading-tight">{slide.title}</h3>
                          <p className="text-white/60 text-[10px] mt-1 line-clamp-2">{slide.subtitle}</p>
                        </>
                      ) : (
                        <>
                          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full" />
                          <span className="text-white/30 text-[10px] font-medium mb-2">{slide.type.toUpperCase()}</span>
                          <h3 className="text-white font-bold text-sm leading-tight">{slide.title}</h3>
                          <p className="text-white/70 text-[10px] mt-1 line-clamp-2">{slide.subtitle}</p>
                          <div className="mt-2 flex gap-1">
                            {[1,2,3].map(j => <div key={j} className="w-2 h-2 rounded-full bg-white/20" />)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 truncate">{slide.type === 'title' ? '封面页' : slide.type === 'agenda' ? '目录页' : slide.type === 'chart' ? '数据图表页' : slide.type === 'image' ? '图片展示页' : '内容页'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== 底部优势区 ===== */}
          <section className="border-t border-gray-100 pt-6 mt-2">
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: <Zap size={18} />, title: '高效智能', desc: 'AI加速创作' },
                { icon: <Shield size={18} />, title: '专业美观', desc: '精美设计' },
                { icon: <Clock size={18} />, title: '多场景适用', desc: '覆盖广泛' },
                { icon: <Lock size={18} />, title: '安全可靠', desc: '隐私保障' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-50">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#1a1a2e]">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== Footer ===== */}
          <footer className="text-center pt-8 pb-4">
            <p className="text-[11px] text-gray-300">© 2026 创视PPT · AI 智能生成 · All rights reserved.</p>
          </footer>
        </div>
      </main>

      {/* ===== 右侧悬浮按钮 ===== */}
      <div className="fixed right-6 bottom-8 flex flex-col gap-3 z-40">
        <button className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:shadow-lg transition-all">
          <div className="bg-gradient-to-br from-primary to-red-600 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm">晶</div>
        </button>
        <button className="w-11 h-11 rounded-full bg-primary shadow-lg flex items-center justify-center hover:brightness-110 transition-all text-white">
          <HelpCircle size={22} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
