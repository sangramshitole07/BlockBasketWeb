import { Github, Linkedin, Twitter } from 'lucide-react';

export const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'API Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Compliance', href: '/compliance' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
      { name: 'Blockchain Explorer', href: '/explorer' },
    ],
  },
];

export const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/blockbasket',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/blockbasket',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/blockbasket',
    icon: Github,
  },
];