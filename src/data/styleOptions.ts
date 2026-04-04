import type { StyleOption, CategoryId } from '../domain/brand-analysis/types';

export interface StyleOptionMeta {
  value: StyleOption;
  label: string;
  description: string;
  emoji: string;
}

export const STYLE_OPTIONS: StyleOptionMeta[] = [
  { value: 'auto', label: '自動分析', description: '系統依品牌名稱推斷類目', emoji: '🤖' },
  { value: 'tech', label: '科技 / SaaS', description: '科技感、數位效率', emoji: '⚡' },
  { value: 'beauty', label: '美妝 / 保養', description: '優雅、自然、奢華', emoji: '✨' },
  { value: 'food', label: '健康食品', description: '有機、天然、溫暖', emoji: '🥗' },
  { value: 'health', label: '健康 / 健身', description: '活力、科學、進步', emoji: '💪' },
  { value: 'fashion', label: '時尚 / 服飾', description: '當代、質感、永恆', emoji: '👗' },
  { value: 'design', label: '設計 / 創意', description: '大膽、策略、轉化', emoji: '🎨' },
  { value: 'engineering', label: '工程 / 製造', description: '精準、可靠、專業', emoji: '⚙️' },
  { value: 'jewelry', label: '珠寶 / 精品', description: '稀有、工藝、傳承', emoji: '💎' },
  { value: 'dining', label: '餐廳 / 美食', description: '儀式感、在地、創意', emoji: '🍽️' },
  { value: 'beverage', label: '飲品 / 咖啡', description: '直接、透明、品味', emoji: '☕' },
  { value: 'legal', label: '法律 / 顧問', description: '可信賴、清晰、保護', emoji: '⚖️' },
  { value: 'hotel', label: '飯店 / 住宿', description: '體驗、在地、舒適', emoji: '🏨' },
  { value: 'finance', label: '金融 / 投資', description: '穩健、透明、成長', emoji: '📈' },
  { value: 'edu', label: '教育 / 學習', description: '實作、成長、就業', emoji: '📚' },
  { value: 'travel', label: '旅遊 / 體驗', description: '深度、在地、轉變', emoji: '✈️' },
];

export const ALL_CATEGORY_IDS: CategoryId[] = [
  'tech', 'beauty', 'food', 'health', 'fashion', 'design',
  'engineering', 'jewelry', 'dining', 'beverage', 'legal',
  'hotel', 'finance', 'edu', 'travel',
];
