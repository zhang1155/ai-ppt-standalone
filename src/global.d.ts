declare module 'qrcode';

// video-react types
declare module 'video-react' {
  import { ComponentType, ReactNode } from 'react';
  
  export const Player: ComponentType<any>;
  export const BigPlayButton: ComponentType<any>;
  export const ControlBar: ComponentType<any>;
  export const PlayToggle: ComponentType<any>;
  export const CurrentTimeDisplay: ComponentType<any>;
  export const TimeDivider: ComponentType<any>;
  export const DurationDisplay: ComponentType<any>;
  export const FullscreenToggle: ComponentType<any>;
  export const VolumeMenuButton: ComponentType<any>;
  export const ProgressControl: ComponentType<any>;
}
