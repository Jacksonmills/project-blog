'use client'

import React from 'react';

import { MotionConfig } from 'framer-motion';

function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default Providers;
