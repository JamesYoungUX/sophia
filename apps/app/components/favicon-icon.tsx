/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react"

export function FaviconIcon({ className }: { className?: string }) {
  return (
    <img
      src="/favicon.svg"
      alt="Sophia"
      className={className}
    />
  )
}
