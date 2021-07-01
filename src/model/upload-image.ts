export enum MozJpegColorSpace {
  grayscale = 1,
  rgb = 2,
  ycbcr = 3,
}

export enum MozJpegQuantTable {
  jpegAnnexK = 0,
  flat = 1,
  mssimTunedKodak = 2,
  imageMagick = 3,
  psnrHvsMTunnedKodak = 4,
  kleinEtAl = 5,
  watsonEtAl = 6,
  ahumadaEtAl = 7,
  petersonEtAl = 8,
}

interface MozJpegEncodeOption {
  quality: number;
  baseline: boolean;
  arithmetic: boolean;
  progressive: boolean;
  optimize_coding: boolean;
  smoothing: number;
  color_space: MozJpegColorSpace;
  quant_table: MozJpegQuantTable;
  trellis_multipass: boolean;
  trellis_opt_zero: boolean;
  trellis_opt_table: boolean;
  trellis_loops: number;
  auto_subsample: boolean;
  chroma_subsample: number;
  separate_chroma_quality: boolean;
  chroma_quality: number;
}

interface OxiPNGEncodeOption {
  level: number;
  interlace: boolean;
}

interface JPEGXLEncodeOption {
  speed: number;
  quality: number;
  progressive: boolean;
  epf: number;
  nearLossless: number;
  lossyPalette: boolean;
  decodingSpeedTier: number;
}

export interface EncodeOptions {
  mozjpeg?: Partial<MozJpegEncodeOption>;
  oxipng?: Partial<OxiPNGEncodeOption>;
  jxl?: Partial<JPEGXLEncodeOption>;
}

enum ResizeMethod {
  Lanczos3 = 'lanczos3',
  Mitchell = 'mitchell',
  CatmullRom = 'catrom',
  TriangleBilinear = 'triangle',
  HQXPixelArt = 'hqx',
  BrowserPixelated = 'browser-pixelated',
  BrowserLowQuality = 'browser-low',
  BrowserMediumQuality = 'browser-medium',
  BrowserHighQuality = 'browser-high',
}

interface Resize {
  enabled: boolean;
  width: number;
  height: number;
  method: ResizeMethod;
  fitMethod: string;
  premultiply: boolean;
  linearRGB: boolean;
}

interface Quant {
  enabled: boolean;
  zx: number;
  maxNumColors: number;
  dither: number;
}

export interface PreprocessOptions {
  resize?: Partial<Resize>;
  quant?: Partial<Quant>;
}
