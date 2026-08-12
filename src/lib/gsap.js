import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, Observer, Draggable, InertiaPlugin, SplitText);

gsap.defaults({ ease: 'power3.out', duration: 0.8 });

export { gsap, ScrollTrigger, Observer, Draggable, InertiaPlugin, SplitText };
