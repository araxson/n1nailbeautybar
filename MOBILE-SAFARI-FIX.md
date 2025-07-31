# Mobile Safari Parallax Fix Summary

## Issue Fixed

- Hero image shaking/jittering while scrolling on mobile Safari
- Parallax effect preserved but optimized for mobile performance

## Changes Made

### 1. Optimized Scroll Handler

- Added proper throttling with `requestAnimationFrame`
- Prevents multiple scroll calculations per frame
- Uses `window.pageYOffset` for better compatibility

### 2. Mobile-Specific Parallax Transform

- Reduced parallax factor from 0.5 to 0.3 on mobile
- Uses simpler `translateY` instead of `translate3d` on mobile
- Rounds pixel values to prevent sub-pixel rendering issues

### 3. Hardware Acceleration

- Added CSS properties for better performance:
  - `backfaceVisibility: 'hidden'`
  - `perspective: 1000`
  - WebKit-specific prefixes for Safari

### 4. CSS Optimizations

- Added mobile Safari-specific styles
- Enabled smooth scrolling with `-webkit-overflow-scrolling: touch`
- Applied `transform: translateZ(0)` for GPU acceleration

## Testing Recommendations

1. Test on actual iOS devices (iPhone/iPad)
2. Check performance on older iOS versions
3. Verify parallax still works on desktop browsers
4. Monitor for any new performance issues

## No UI/Style Changes

- All visual design remains exactly the same
- Parallax effect is still active but optimized
- No changes to animations or transitions
