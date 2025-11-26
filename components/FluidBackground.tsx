/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none filter contrast-150 brightness-50"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
      
      {/* Random Glitch Elements could go here, but keeping it strict grid for now */}
    </div>
  );
};

export default FluidBackground;