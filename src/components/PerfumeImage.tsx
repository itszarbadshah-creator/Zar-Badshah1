import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface PerfumeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  id?: string;
  key?: React.Key;
  fallbackTitle?: string;
}

export default function PerfumeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  ...props
}: PerfumeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [retryStage, setRetryStage] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setRetryStage(0);
    setHasError(false);
  }, [src]);

  const extractFilename = (pathStr: string) => {
    const parts = pathStr.split('/');
    return parts[parts.length - 1];
  };

  const handleImageError = () => {
    const filename = extractFilename(src);

    if (retryStage === 0) {
      // Stage 1: Try /assets/images/...
      setRetryStage(1);
      setCurrentSrc(`/assets/images/${filename}`);
    } else if (retryStage === 1) {
      // Stage 2: Try relative assets/images/...
      setRetryStage(2);
      setCurrentSrc(`assets/images/${filename}`);
    } else if (retryStage === 2) {
      // Stage 3: Try /src/assets/images/...
      setRetryStage(3);
      setCurrentSrc(`/src/assets/images/${filename}`);
    } else if (retryStage === 3) {
      // Stage 4: Try relative src/assets/images/...
      setRetryStage(4);
      setCurrentSrc(`src/assets/images/${filename}`);
    } else if (retryStage === 4) {
      // Stage 5: Try /images/...
      setRetryStage(5);
      setCurrentSrc(`/images/${filename}`);
    } else {
      // Final stage: Show luxury placeholder
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gradient-to-b from-[#18150D] via-[#0E0D08] to-[#080806] border border-gold-400/20 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        aria-label={alt}
      >
        <div className="w-14 h-14 rounded-full border border-gold-400/30 flex items-center justify-center bg-gold-400/10 mb-2 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-6 h-6 text-gold-400" />
        </div>
        <span className="text-[10px] font-display font-bold tracking-[0.25em] text-gold-400 uppercase">
          Zarbadshah
        </span>
        <span className="text-xs font-serif text-white/90 mt-1 max-w-[85%] truncate font-medium">
          {fallbackTitle || alt}
        </span>
        <span className="text-[8px] tracking-widest text-gold-500/70 font-mono mt-1 uppercase">
          Royal Fragrance
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleImageError}
      className={className}
      {...props}
    />
  );
}
