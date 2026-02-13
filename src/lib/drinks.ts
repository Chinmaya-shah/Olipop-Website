export type DrinkVariant = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  webpSequenceUrl: (frame: number) => string;
  frameCount: number;
};

const padFrame = (frame: number) => frame.toString().padStart(3, '0');

export const drinkVariants: DrinkVariant[] = [
  {
    id: 'cherry',
    name: 'CHERRY',
    subtitle: 'COLA',
    description: 'A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.',
    themeColor: '#E5244F',
    webpSequenceUrl: (frame: number) => `https://vojwcqmeohevwcrdejjr.supabase.co/storage/v1/object/public/Oliopop%20Cherry/frame_${padFrame(frame + 1)}_delay-0.041s.webp`,
    frameCount: 240,
  },
  {
    id: 'grape',
    name: 'GRAPE',
    subtitle: 'SODA',
    description: 'A modern functional soda brand inspired by classic flavors but made with better ingredients.',
    themeColor: '#7A3E96',
    webpSequenceUrl: (frame: number) => `https://vojwcqmeohevwcrdejjr.supabase.co/storage/v1/object/public/Oliopop%20Grape/frame_${padFrame(frame)}_delay-0.042s.webp`,
    frameCount: 240,
  },
  {
    id: 'lemon-ginger',
    name: 'LEMON',
    subtitle: 'GINGER SODA',
    description: 'Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.',
    themeColor: '#F5C518',
    webpSequenceUrl: (frame: number) => `https://vojwcqmeohevwcrdejjr.supabase.co/storage/v1/object/public/Oliopop%20Lemon/frame_${padFrame(frame)}_delay-0.042s.webp`,
    frameCount: 240,
  },
];
