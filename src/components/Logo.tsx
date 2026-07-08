import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'emblem' | 'full' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
}

export function LogoEmblem({ className = '', glow = false }: { className?: string; glow?: boolean }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={`fill-gold-500 ${glow ? 'drop-shadow-[0_0_15px_rgba(212,175,21,0.4)]' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gold-gradient-logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7ed9f" />
          <stop offset="50%" stopColor="#d4af15" />
          <stop offset="100%" stopColor="#795311" />
        </linearGradient>
      </defs>
      {/* Handcrafted detailed paths representing the elegant Zarbadshah Urdu Calligraphy */}
      <g fill="url(#gold-gradient-logo)">
        {/* 'Ze' dot */}
        <path d="M228 152 C226 148, 232 140, 236 142 C242 144, 240 156, 234 156 C231 156, 229 154, 228 152 Z" />
        
        {/* Main 'Ze' curve */}
        <path d="M214 180 C208 172, 218 164, 226 168 C238 174, 232 192, 220 188 C217 186, 215 183, 214 180 Z" />

        {/* 'Re' stroke */}
        <path d="M192 198 C198 186, 212 178, 222 188 C232 198, 218 214, 204 208 C198 205, 194 201, 192 198 Z" />

        {/* 'Be' start swoop */}
        <path d="M174 240 C170 230, 182 222, 192 228 C204 236, 196 254, 184 250 C178 248, 175 244, 174 240 Z" />

        {/* 'Be' & 'Alif' tall elegant connection */}
        <path d="M280 160 C272 130, 292 110, 305 130 C318 150, 295 180, 285 170 C282 167, 281 163, 280 160 Z" />
        
        {/* Main Calligraphy Circular Shape - Outer Ring of Text (Stylized Arabic strokes) */}
        {/* Top-Right Swoop */}
        <path d="M276 166 C290 172, 302 184, 308 198 C314 212, 310 228, 300 238 C290 248, 274 250, 262 244 C250 238, 244 224, 250 212 C256 200, 272 194, 284 200 C292 204, 294 212, 290 218 C286 224, 276 226, 270 220" />
        
        {/* Center Complex Calligraphy Node 'Sheen' (Tooth 1, 2, 3) */}
        <path d="M220 280 C210 270, 224 250, 235 255 C246 260, 240 280, 228 282 M238 275 C230 265, 244 248, 252 252 C260 256, 256 274, 245 276 M252 270 C244 260, 258 244, 266 248 C274 252, 270 270, 259 271" />
        
        {/* Sheen Three Dots in triangle */}
        <path d="M232 232 C230 228, 236 222, 239 224 C243 226, 241 234, 236 234 C234 234, 233 233, 232 232 Z" />
        <path d="M246 230 C244 226, 250 220, 253 222 C257 224, 255 232, 250 232 C248 232, 247 231, 246 230 Z" />
        <path d="M239 218 C237 214, 243 208, 246 210 C250 212, 248 220, 243 220 C241 220, 240 219, 239 218 Z" />

        {/* 'Dal' center scoop */}
        <path d="M285 240 C275 235, 270 248, 275 255 C282 265, 295 255, 290 245 C289 242, 287 241, 285 240 Z" />

        {/* 'Dal' base connector */}
        <path d="M295 250 C285 248, 282 262, 290 268 C298 274, 305 260, 300 252 C298 249, 296 249, 295 250 Z" />

        {/* Big sweeping base loop (The 'Ya' / 'He' connector representing the lower crescent of the droplet) */}
        <path d="M178 280 C182 310, 210 338, 250 338 C290 338, 325 310, 325 272 C325 245, 305 220, 285 220 C265 220, 252 235, 252 250 C252 265, 268 280, 288 280 C308 280, 314 260, 314 250 C314 275, 290 315, 250 315 C210 315, 194 285, 192 265 C190 245, 202 225, 218 215 C228 208, 230 198, 220 200 C202 205, 182 228, 178 250 C175 260, 176 270, 178 280 Z" />

        {/* Left 'Alif' vertical bar */}
        <path d="M165 210 C160 210, 155 240, 158 270 C160 300, 170 320, 175 320 C180 320, 175 290, 172 260 C170 230, 170 210, 165 210 Z" />

        {/* Right swooping 'He' tail */}
        <path d="M312 280 C318 280, 335 278, 345 285 C355 292, 348 305, 332 305 C315 305, 305 292, 312 280 Z" />

        {/* Floating Accent: Fatha (Slash at top-right) */}
        <path d="M260 140 L285 125 C288 123, 292 127, 290 130 L265 145 C262 147, 258 143, 260 140 Z" />
        
        {/* Floating Accent: Samma (Swirl at top-left) */}
        <path d="M195 160 C190 155, 198 145, 204 150 C210 155, 202 168, 196 168 C194 168, 192 165, 195 160 Z" />

        {/* Floating Accent: Small mini swirl on left */}
        <path d="M152 245 C148 240, 155 232, 160 235 C165 238, 160 250, 154 250 C152 250, 151 248, 152 245 Z" />

        {/* Floating Accent: Small mini stroke on right */}
        <path d="M328 215 C326 210, 332 204, 335 206 C338 208, 336 218, 331 218 C329 218, 328 217, 328 215 Z" />

        {/* Bottom Small Calligraphy accent 'v' shapes */}
        <path d="M210 325 C208 322, 214 316, 217 318 L223 325 L229 318 C232 316, 238 322, 236 325 L226 335 C224 337, 222 337, 220 335 Z" />
        <path d="M276 320 C274 317, 280 311, 283 313 L289 320 L295 313 C298 311, 304 317, 302 320 L292 330 C290 332, 288 332, 286 330 Z" />
      </g>
    </svg>
  );
}

export default function Logo({
  className = '',
  variant = 'full',
  size = 'md',
  glow = false,
}: LogoProps) {
  const sizeClasses = {
    xs: 'h-8',
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-32',
    xl: 'h-48 md:h-64',
  };

  if (variant === 'emblem') {
    return <LogoEmblem className={`${sizeClasses[size]} ${className}`} glow={glow} />;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <LogoEmblem className="h-12 w-12" glow={glow} />
        <div className="flex flex-col items-start">
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.25em] text-white leading-none">
            ZARBADSHAH
          </span>
          <span className="text-[7.5px] tracking-[0.3em] text-gold-400 font-sans uppercase mt-1 font-medium">
            The Scent of Royalty
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Emblem at the top */}
      <LogoEmblem className={`${sizeClasses[size]} w-auto`} glow={glow} />
      
      {/* Brand Text */}
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] text-white mt-1 uppercase">
        ZARBADSHAH
      </h1>
      
      {/* Tagline / Subtitle */}
      <p className="text-[8px] sm:text-[10px] tracking-[0.35em] text-gold-400 font-medium font-sans uppercase mt-1.5">
        The Scent of Royalty
      </p>
    </div>
  );
}
