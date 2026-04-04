import type { CategoryId } from './types';

/**
 * Each rule maps a regex pattern to a category with a score weight.
 * Rules are evaluated against lowercased brand name.
 * Use \b word boundaries for short patterns to avoid false substring matches.
 */
export interface ScoringRule {
  pattern: RegExp;
  category: CategoryId;
  weight: number;
}

export const SCORING_RULES: ScoringRule[] = [
  // Chinese semantic signals
  { pattern: /好吃|吃香|美味|食堂|食材|鮮食|飯館|飯堂|便當|料理|廚房|餐盒|食補|食光|食刻|米食|麵館|湯品|小吃|食/i, category: 'food', weight: 12 },
  { pattern: /餐廳|餐酒|鍋物|火鍋|燒肉|居酒屋|宴席|主廚|私廚|牛排|壽司|食府|食肆|酒館|晚餐|早午餐|宵夜/i, category: 'dining', weight: 12 },
  { pattern: /好喝|飲品|手搖|茶飲|奶茶|咖啡|果汁|冷萃|茶坊|茶舖|茶行|茶室|咖啡館|咖啡店|豆子|烘豆|喝/i, category: 'beverage', weight: 12 },
  { pattern: /美肌|保養|香氛|精華|面膜|妝容|美妝|美容|護膚|亮白|嫩膚/i, category: 'beauty', weight: 12 },
  { pattern: /健身|運動|體能|瑜伽|肌力|燃脂|健康|復健|訓練/i, category: 'health', weight: 12 },
  { pattern: /設計|創意|視覺|品牌|字體|空間|工作室|編排|選物/i, category: 'design', weight: 12 },
  { pattern: /工程|製造|機械|金屬|鋼鐵|工具|設備|精工|工業/i, category: 'engineering', weight: 12 },
  { pattern: /珠寶|金工|銀飾|鑽石|寶石|珍珠|飾品|玉石/i, category: 'jewelry', weight: 12 },
  { pattern: /法律|律師|法務|顧問|智財|合規|契約/i, category: 'legal', weight: 12 },
  { pattern: /旅宿|飯店|酒店|民宿|度假|客房|旅館/i, category: 'hotel', weight: 12 },
  { pattern: /金融|理財|投資|保險|資本|證券|財富/i, category: 'finance', weight: 12 },
  { pattern: /教育|學院|學習|補習|課程|知識|訓練營/i, category: 'edu', weight: 12 },
  { pattern: /旅遊|旅行|漫遊|探索|行旅|旅程|遠行/i, category: 'travel', weight: 12 },
  // ── Tech / SaaS ────────────────────────────────────────────────────────────
  { pattern: /\bai\b|\bbot\b|\bgpt\b|\bllm\b|\bml\b|\bauto\b|\bsync\b|\bflow\b|\bpipe\b|\bstack\b|\bapi\b|\bsdk\b|\bsaas\b|\bcloud\b|\bdata\b|\bops\b|\bdev\b|\bhub\b|\blab\b|\.io$|\bio\b/, category: 'tech', weight: 10 },
  { pattern: /\btech\b|\bdigital\b|\bcyber\b|\bnet\b|\bsoft\b|\bcode\b|\bapp\b|\bsys\b|\bplatform\b/, category: 'tech', weight: 8 },
  { pattern: /\bdash\b|\bpanel\b|\bsuite\b|\bstudio\b|\bforge\b(?!.*engineer)|\bbase\b|\bkit\b/, category: 'tech', weight: 5 },

  // ── Beauty / 美妝 ──────────────────────────────────────────────────────────
  { pattern: /\bbeauty\b|\bglow\b|\bskin\b|\bserum\b|\blux\b|\blumiere\b|\blumière\b|\bbloom\b|\brose\b|\bpetal\b|\bvelvet\b|\belixir\b/, category: 'beauty', weight: 10 },
  { pattern: /\bcosmetic\b|\bmakeup\b|\bblush\b|\bglam\b|\bradiance\b|\baura\b|\bessence\b/, category: 'beauty', weight: 8 },
  { pattern: /\blumina\b|\bgrace\b|\bpure\b.*\bskin\b|\bskin\b.*\bcare\b/, category: 'beauty', weight: 7 },

  // ── Food / 健康食品 ─────────────────────────────────────────────────────────
  { pattern: /\borganic\b|\bfarm\b|\bharvest\b|\bfresh\b|\bgreen\b.*\bfood\b|\bgarden\b|\bnatural\b|\bplant\b.*\bfood\b|\broot\b|\bseed\b|\bgrain\b/, category: 'food', weight: 10 },
  { pattern: /\bbowl\b|\bbite\b|\bkitchen\b|\bmeal\b|\bnourish\b|\bwholesome\b|\braw\b.*\bfood\b/, category: 'food', weight: 7 },

  // ── Health / 健身 ──────────────────────────────────────────────────────────
  { pattern: /\bfit\b|\bgym\b|\bsport\b|\btrain\b|\bmuscle\b|\bstrong\b|\blean\b|\bflex\b|\brun\b|\byoga\b|\bzen\b|\bwellness\b/, category: 'health', weight: 10 },
  { pattern: /\bvital\b|\bpulse\b|\bpower\b|\bboost\b|\bactive\b|\bmotion\b|\bdynamic\b/, category: 'health', weight: 8 },

  // ── Fashion ────────────────────────────────────────────────────────────────
  { pattern: /\bfashion\b|\bwear\b|\bstyle\b|\bcouture\b|\batelier\b|\bthread\b|\bstitch\b|\bdrape\b|\bloom\b|\bfabric\b/, category: 'fashion', weight: 10 },
  { pattern: /\bvogue\b|\bchic\b|\bminimal\b|\bmode\b|\bcloth\b|\bapparel\b|\bdress\b|\bshirt\b/, category: 'fashion', weight: 7 },

  // ── Design / 創意 ──────────────────────────────────────────────────────────
  { pattern: /\bdesign\b|\bcreative\b|\bcraft\b|\bvisual\b|\bpixel\b|\bcanvas\b|\bpalette\b|\bink\b|\bdraw\b/, category: 'design', weight: 10 },
  { pattern: /\bbrand\b|\bidentity\b|\blogo\b|\btype\b|\bgraphic\b|\bfine.*art\b|\bagency\b/, category: 'design', weight: 7 },

  // ── Engineering / 工程 ─────────────────────────────────────────────────────
  { pattern: /\bengineer\b|\bindustrial\b|\bmanufactur\b|\bprecision\b|\bmech\b|\bcnc\b|\bsteel\b|\bmetal\b|\bbuilder\b|\bconstruct\b/, category: 'engineering', weight: 10 },
  { pattern: /\bsolutions\b|\bsystems\b|\bintegrat\b|\bmachin\b|\bequip\b|\bheavy\b|\bforg\b(?=.*steel|.*metal|.*industrial)/, category: 'engineering', weight: 7 },
  { pattern: /\bsteelforge\b|\bironwork\b|\bmetalwork\b|\bweldtek\b/, category: 'engineering', weight: 15 },

  // ── Jewelry / 珠寶 ─────────────────────────────────────────────────────────
  // use prefix \bjewel (covers jewel/jewels/jewelry) and \bgem (covers gems)
  { pattern: /\bjewel|\bgem\b|\bdiamond\b|\bgold\b|\bsilver\b|\bpearl\b|\bcrystal\b|\bprecious\b|\bnecklace\b/, category: 'jewelry', weight: 10 },
  { pattern: /\bluxury\b|\bboutique\b|\bmaison\b/, category: 'jewelry', weight: 4 },
  // explicit plural "jewels" or "gems" as standalone strengthens signal
  { pattern: /\bjewels\b|\bgems\b|\bjewelry\b/, category: 'jewelry', weight: 8 },

  // ── Dining / 餐廳 ──────────────────────────────────────────────────────────
  { pattern: /\brestaurant\b|\bbistro\b|\bbrasserie\b|\bgrill\b|\btable\b|\bdine\b|\bfeast\b|\bchef\b|\bcuisine\b|\beatery\b/, category: 'dining', weight: 10 },
  { pattern: /\btavern\b|\binn\b|\bsupper\b|\bdinner\b|\blunch\b|\bbrunch\b/, category: 'dining', weight: 7 },

  // ── Beverage / 飲品 ────────────────────────────────────────────────────────
  // \bbrew covers brew/brewed/brewery/brewing
  { pattern: /\bcoffee\b|\bcafe\b|\bbrew|\broast\b|\bespresso\b|\bbean\b|\blatte\b|\btea\b|\bmatcha\b|\bdrink\b|\bjuice\b|\bsip\b/, category: 'beverage', weight: 10 },
  { pattern: /\bcup\b|\bmug\b|\bblend\b|\bpour\b|\bdrip\b|\bsteep\b|\binfuse\b|\bkombucha\b/, category: 'beverage', weight: 8 },

  // ── Legal / 法律 ───────────────────────────────────────────────────────────
  { pattern: /\blegal\b|\blaw\b|\battorney\b|\bcounsel\b|\bbarrister\b|\bsolicitor\b|\badvocate\b|\bjustice\b|\bfirm\b|\blex\b/, category: 'legal', weight: 10 },
  { pattern: /\bcompliance\b|\bcontract\b|\bpatent\b|\bcorporate\b|\blitigation\b/, category: 'legal', weight: 8 },

  // ── Hotel / 住宿 ───────────────────────────────────────────────────────────
  { pattern: /\bhotel\b|\bresort\b|\blodge\b|\bsuites\b|\bvilla\b|\bpalace\b|\bmanor\b|\bretreat\b/, category: 'hotel', weight: 10 },
  { pattern: /\bhospitality\b|\baccommodation\b|\bguest\b|\bhost\b/, category: 'hotel', weight: 7 },

  // ── Finance / 金融 ─────────────────────────────────────────────────────────
  { pattern: /\bfinance\b|\binvest\b|\bcapital\b|\bfund\b|\bwealth\b|\basset\b|\bportfolio\b|\bbanking\b|\bfintech\b|\bfin\b/, category: 'finance', weight: 10 },
  { pattern: /\bmoney\b|\btrade\b|\bmarket\b|\bequity\b|\bhedge\b|\bventure\b|\btrust\b/, category: 'finance', weight: 8 },

  // ── Edu / 教育 ─────────────────────────────────────────────────────────────
  { pattern: /\bedu\b|\blearn\b|\bacademy\b|\bschool\b|\bcourse\b|\bteach\b|\bmentor\b|\btutor\b|\bcampus\b|\bclass\b/, category: 'edu', weight: 10 },
  { pattern: /\bskill\b|\btraining\b|\bbootcamp\b|\bworkshop\b|\blecture\b|\bcertif\b/, category: 'edu', weight: 8 },

  // ── Travel / 旅遊 ──────────────────────────────────────────────────────────
  { pattern: /\btravel\b|\btour\b|\bjourney\b|\bexplore\b|\bwander\b|\bvoyage\b|\btrip\b|\btrek\b|\badventure\b|\broam\b|\btrail\b|\bnomad\b/, category: 'travel', weight: 10 },
  { pattern: /\bdestination\b|\bgetaway\b|\bescape\b|\bglobe\b|\bbackpack\b/, category: 'travel', weight: 8 },
];
