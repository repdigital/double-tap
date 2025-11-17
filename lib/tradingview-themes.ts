import { DeepPartial, ChartOptions, ColorType } from 'lightweight-charts'

export function getLightTheme(): DeepPartial<ChartOptions> {
  return {
    layout: {
      background: { type: ColorType.Solid, color: '#FFFFFF' },
      textColor: '#0A0A0A',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: 12,
    },
    grid: {
      vertLines: { visible: false },
      horzLines: {
        color: '#E5E5E5',
        style: 0, // Solid line
        visible: true,
      },
    },
    crosshair: {
      mode: 1, // Magnet mode
      vertLine: {
        color: '#03873E',
        width: 1,
        style: 3, // Dashed
        labelBackgroundColor: '#03873E',
      },
      horzLine: {
        color: '#03873E',
        width: 1,
        style: 3,
        labelBackgroundColor: '#03873E',
      },
    },
    rightPriceScale: {
      borderColor: '#E5E5E5',
      borderVisible: true,
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
      textColor: '#525252',
    },
    timeScale: {
      borderColor: '#E5E5E5',
      borderVisible: true,
      timeVisible: true,
      secondsVisible: false,
      textColor: '#525252',
    },
    watermark: {
      visible: false,
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: true,
    },
    handleScale: {
      axisPressedMouseMove: true,
      mouseWheel: true,
      pinch: true,
    },
  }
}

export function getDarkTheme(): DeepPartial<ChartOptions> {
  return {
    layout: {
      background: { type: ColorType.Solid, color: '#0A0A0A' },
      textColor: '#E5E5E5',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: 12,
    },
    grid: {
      vertLines: { visible: false },
      horzLines: {
        color: '#2A2A2A',
        style: 0,
        visible: true,
      },
    },
    crosshair: {
      mode: 1,
      vertLine: {
        color: '#04A04E',
        width: 1,
        style: 3,
        labelBackgroundColor: '#04A04E',
      },
      horzLine: {
        color: '#04A04E',
        width: 1,
        style: 3,
        labelBackgroundColor: '#04A04E',
      },
    },
    rightPriceScale: {
      borderColor: '#2A2A2A',
      borderVisible: true,
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
      textColor: '#6B6B6B',
    },
    timeScale: {
      borderColor: '#2A2A2A',
      borderVisible: true,
      timeVisible: true,
      secondsVisible: false,
      textColor: '#6B6B6B',
    },
    watermark: {
      visible: false,
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: true,
    },
    handleScale: {
      axisPressedMouseMove: true,
      mouseWheel: true,
      pinch: true,
    },
  }
}

export function getMinimalTheme(isDark: boolean): DeepPartial<ChartOptions> {
  const baseTheme = isDark ? getDarkTheme() : getLightTheme()

  return {
    ...baseTheme,
    grid: {
      vertLines: { visible: false },
      horzLines: {
        color: isDark ? '#2A2A2A' : '#E5E5E5',
        style: 0,
        visible: true, // Show subtle horizontal grid lines
      },
    },
    rightPriceScale: {
      ...baseTheme.rightPriceScale,
      visible: false,
    },
    timeScale: {
      ...baseTheme.timeScale,
      visible: false,
    },
    crosshair: {
      ...baseTheme.crosshair,
      vertLine: {
        ...baseTheme.crosshair?.vertLine,
        visible: false,
      },
      horzLine: {
        ...baseTheme.crosshair?.horzLine,
        visible: false,
      },
    },
  }
}

// Area series styling
export function getAreaSeriesStyle(isDark: boolean) {
  return {
    lineColor: isDark ? '#04A04E' : '#03873E',
    topColor: isDark ? 'rgba(4, 160, 78, 0.3)' : 'rgba(3, 135, 62, 0.3)',
    bottomColor: isDark ? 'rgba(4, 160, 78, 0.05)' : 'rgba(3, 135, 62, 0.05)',
    lineWidth: 2,
    priceLineVisible: false,
    lastValueVisible: true,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: isDark ? '#04A04E' : '#03873E',
    crosshairMarkerBackgroundColor: '#FFFFFF',
  }
}

// Line series styling
export function getLineSeriesStyle(color: string, width: number = 2) {
  return {
    color,
    lineWidth: width,
    priceLineVisible: false,
    lastValueVisible: true,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: color,
    crosshairMarkerBackgroundColor: '#FFFFFF',
  }
}

// Histogram series styling
export function getHistogramSeriesStyle(color: string) {
  return {
    color,
    priceFormat: {
      type: 'volume',
    },
    priceScaleId: '',
    scaleMargins: {
      top: 0.7,
      bottom: 0,
    },
  }
}

// Candlestick series styling
export function getCandlestickSeriesStyle(isDark: boolean) {
  return {
    upColor: isDark ? '#04A04E' : '#03873E',
    downColor: isDark ? '#EF4444' : '#DC2626',
    borderUpColor: isDark ? '#04A04E' : '#03873E',
    borderDownColor: isDark ? '#EF4444' : '#DC2626',
    wickUpColor: isDark ? '#04A04E' : '#03873E',
    wickDownColor: isDark ? '#EF4444' : '#DC2626',
  }
}

// Baseline series styling (for signal strength)
export function getBaselineSeriesStyle(isDark: boolean) {
  return {
    baseValue: { type: 'price', price: 0 },
    topLineColor: isDark ? '#04A04E' : '#03873E',
    topFillColor1: isDark ? 'rgba(4, 160, 78, 0.3)' : 'rgba(3, 135, 62, 0.3)',
    topFillColor2: isDark ? 'rgba(4, 160, 78, 0.1)' : 'rgba(3, 135, 62, 0.1)',
    bottomLineColor: isDark ? '#EF4444' : '#DC2626',
    bottomFillColor1: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.3)',
    bottomFillColor2: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.1)',
    lineWidth: 2,
    priceLineVisible: false,
  }
}
