/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// For the brutalist version, we are removing the colorful glitch 
// and replacing it with a simple pass-through to keep the code clean 
// but allowing for extension if we want CSS text glitches later.
interface GradientTextProps {
  text: string;
  as?: any;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`${className}`}>
      {text}
    </Component>
  );
};

export default GradientText;