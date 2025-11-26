/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Stiffer spring for mechanical feel
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Crosshair */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute w-[30px] h-[1px] bg-white"></div>
        <div className="absolute w-[1px] h-[30px] bg-white"></div>
        
        {/* Center Dot */}
        <div className={`w-1 h-1 bg-[#ccff00] ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
      </motion.div>
      
      {/* Coordinates Text */}
      <motion.div 
        className="absolute top-6 left-6 font-mono text-[10px] text-white whitespace-nowrap"
        animate={{ opacity: isHovering ? 1 : 0 }}
      >
        TARGET_LOCKED
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;