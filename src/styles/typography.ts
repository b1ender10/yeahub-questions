import type { CSSProperties } from 'react'

export type TypographyParams = {
  fontSize?: number | string
  fontWeight?: CSSProperties['fontWeight']
  lineHeight?: number | string
}

export function typography({
  fontSize,
  fontWeight,
  lineHeight,
}: TypographyParams = {}): CSSProperties {
  const style: CSSProperties = {}

  if (fontSize !== undefined) {
    style.fontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize
  }

  if (fontWeight !== undefined) {
    style.fontWeight = fontWeight
  }

  if (lineHeight !== undefined) {
    style.lineHeight = lineHeight
  }

  return style
}

