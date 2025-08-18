/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import '@testing-library/jest-dom';
import { beforeAll } from 'vitest';

// Setup DOM environment
beforeAll(() => {
  // Ensure document is available
  if (typeof document === 'undefined') {
    global.document = window.document;
  }
});
