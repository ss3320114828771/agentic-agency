import Link from 'next/link'

export default function SocialLinks() {
  const socials = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'Vercel', icon: '▲', url: 'https://vercel.com' },
    { name: 'WhatsApp', icon: '📱', url: 'https://whatsapp.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl hover:scale-110 transition-transform hover:shadow-lg hover:shadow-purple-500/50"
          title={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  )
}