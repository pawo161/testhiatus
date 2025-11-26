/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  return (
    <div
      className="group relative h-[350px] w-full overflow-hidden bg-black cursor-pointer"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover grayscale transition-all duration-0 group-hover:grayscale-0 group-hover:contrast-125"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-0" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

      {/* Info */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-0">
           <span className="text-xs font-mono bg-[#ccff00] text-black px-2 py-1">
             {artist.day}
           </span>
           <ArrowRight className="text-white w-6 h-6 -rotate-45" />
        </div>

        <div>
          <h3 className="font-heading text-2xl font-bold uppercase text-white group-hover:text-[#ccff00] transition-colors duration-0 truncate">
            {artist.name}
          </h3>
          <p className="text-xs font-mono uppercase text-gray-400 mt-1 border-t border-gray-700 pt-2 inline-block">
            {artist.genre}
          </p>
        </div>
      </div>
      
      {/* Hover Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ccff00] transition-colors duration-0 pointer-events-none z-30" />
    </div>
  );
};

export default ArtistCard;