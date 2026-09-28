export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 100 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z" fill="white" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M50 20L30 35M50 50L25 50M50 80L35 65" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="28" cy="35" r="3" fill="#2563eb" />
      <circle cx="22" cy="50" r="3" fill="#2563eb" />
      <circle cx="33" cy="65" r="3" fill="#2563eb" />
      <path d="M50 20V80M50 20L75 35V65L50 80" fill="#0f172a" />
      <path d="M55 40H70M55 50H65M55 60H70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="8" fill="#2563eb" />
      <circle cx="50" cy="50" r="14" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );
}
