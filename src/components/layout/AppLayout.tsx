import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  LayoutTemplate, 
  FileText, 
  History, 
  Trash2, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, active, collapsed, to }: SidebarItemProps & { to?: string }) => {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-5 h-[44px] cursor-pointer transition-all relative group",
        active 
          ? "bg-[#FFF0F0] text-primary font-bold border-l-[4px] border-primary" 
          : "text-[#666] hover:bg-[#FAFAFA]"
      )}
    >
      <div className={cn("shrink-0", active ? "text-primary" : "text-[#666]")}>
        {React.cloneElement(icon as React.ReactElement<{size: number}>, { size: 20 })}
      </div>
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Sync collapsed state with mobile view
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const menuItems = [
    { icon: <Home />, label: '首页', to: '/' },
    { icon: <PlusCircle />, label: 'AI生成PPT', to: '/canvas' },
    { icon: <LayoutTemplate />, label: '模板中心', to: '/canvas' },
    { icon: <FileText />, label: '我的文档' },
    { icon: <History />, label: '历史记录' },
    { icon: <Trash2 />, label: '回收站' },
    { icon: <Users />, label: '团队协作' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-[#333] font-sans" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif" }}>
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full border-r border-[#f0f0f0] bg-white z-50 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-[200px]"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center gap-3 mb-2">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-white font-bold text-[20px] shadow-sm">
              创
            </div>
            {!collapsed && (
              <div className="flex flex-col relative">
                <span className="font-bold text-[18px] text-[#333]">创视PPT</span>
                <div className="absolute -right-2 -top-2 translate-x-full">
                  <span className="bg-[#FFF0F0] text-primary text-[11px] px-1.5 py-0.5 rounded-[4px] font-medium whitespace-nowrap">
                    AI 智能生成
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 mt-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to} 
              collapsed={collapsed}
              to={item.to}
            />
          ))}
          
          <div className="mt-5 px-5">
            {!collapsed ? (
              <Link to="/canvas">
                <Button 
                  type="button" 
                  className="w-full bg-primary hover:brightness-110 text-white font-bold rounded-[8px] py-[12px] px-0 h-auto shadow-sm transition-all"
                >
                  <PlusCircle size={20} className="mr-2" />
                  <span className="text-[16px]">开始生成</span>
                </Button>
              </Link>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/canvas">
                      <Button type="button" size="icon" className="w-full bg-primary hover:brightness-110 rounded-[8px] h-10 shadow-sm transition-all">
                        <PlusCircle size={20} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">开始生成</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="border-t border-[#f0f0f0] mt-auto">
          <div className="flex flex-col py-2">
            <div className="flex items-center gap-3 px-5 py-2 cursor-pointer text-[#666] hover:bg-[#FAFAFA] transition-colors">
              <MessageSquare size={18} />
              {!collapsed && <span className="text-[12px]">消息</span>}
            </div>
            <div className="flex items-center gap-3 px-5 py-2 cursor-pointer text-[#666] hover:bg-[#FAFAFA] transition-colors">
              <HelpCircle size={18} />
              {!collapsed && <span className="text-[12px]">帮助中心</span>}
            </div>
            <div className="flex items-center gap-3 px-5 py-2 cursor-pointer text-[#666] hover:bg-[#FAFAFA] transition-colors">
              <Settings size={18} />
              {!collapsed && <span className="text-[12px]">设置</span>}
            </div>
          </div>
          
          <div className={cn(
            "flex items-center gap-3 p-4",
            collapsed ? "justify-center" : "px-5"
          )}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-white font-bold text-[16px] shadow-sm">
              晶
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[14px] font-bold text-[#333] truncate">晶晶</span>
                <span className="text-[11px] text-[#999] truncate">免费版用户</span>
              </div>
            )}
          </div>
        </div>


        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#f0f0f0] bg-white shadow-sm z-50 md:flex hidden hover:bg-[#FAFAFA]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-[200px]"
      )}>
        {children}
      </main>
    </div>
  );
};

