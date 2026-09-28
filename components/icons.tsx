import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export function DocumentIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M6 2.8h8l4 4V21H6z"/><path d="M14 2.8V7h4M9 12h6M9 16h6"/></svg>;
}
export function RequestIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h5"/><path d="m14.5 17 1.4 1.4 2.8-3"/></svg>;
}
export function ChatIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 5.5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/></svg>;
}
export function CalendarIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 9h17M8 13h2M14 13h2M8 16h2"/></svg>;
}
export function HomeIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m3 11 9-8 9 8"/><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7"/></svg>;
}
export function ProfileIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>;
}
export function AppleIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M15.6 12.1c0-2 1.7-3 1.8-3.1a4 4 0 0 0-3.1-1.7c-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.9-.8A4.3 4.3 0 0 0 4.6 9.5c-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-3.1-1.2-3.1-3.8ZM13.4 5.9a3.5 3.5 0 0 0 .8-2.6 3.7 3.7 0 0 0-2.4 1.3 3.3 3.3 0 0 0-.8 2.5c.9.1 1.8-.4 2.4-1.2Z" fill="currentColor" stroke="none"/></svg>;
}
export function AndroidIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m8 5-1.5-2M16 5l1.5-2M5 10h14v8H5zM7 8a5.5 5.5 0 0 1 10 0M8 21v-3M16 21v-3M2.5 10v6M21.5 10v6"/></svg>;
}
export function DesktopIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 21h8M12 16.5V21"/></svg>;
}
export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
}
export function ClockIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 5 6v5c0 4.7 2.9 8.3 7 10 4.1-1.7 7-5.3 7-10V6z"/></svg>;
}
export function UsersIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="9" cy="9" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.8M17 15a5 5 0 0 1 3.5 4.8"/></svg>;
}
export function StarIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>;
}
