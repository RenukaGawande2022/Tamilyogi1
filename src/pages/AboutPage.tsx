import React from 'react';
import { Navbar } from '../components/Navbar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Info, Mail, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AboutPageProps {
  type: 'about' | 'contact';
}

export function AboutPage({ type }: AboutPageProps) {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Us',
          icon: Info,
          sections: [
            {
              title: 'Our Mission',
              content: 'At Tamilyogi Movie, we are dedicated to providing movie enthusiasts with comprehensive, accurate, and up-to-date information about films from around the world. Our platform serves as a bridge between cinema and audiences, offering detailed insights into movies, cast information, and reviews.'
            },
            {
              title: 'What We Offer',
              content: 'Our platform features an extensive movie database, detailed cast and crew information, professional reviews, and user ratings. We strive to maintain the highest standards of accuracy and completeness in our movie information.'
            },
            {
              title: 'Our Commitment',
              content: 'We are committed to providing a user-friendly, informative, and engaging platform for movie lovers. Our team constantly updates and verifies information to ensure accuracy.'
            },
            {
              title: 'Community Guidelines',
              content: 'We maintain strict community guidelines to ensure a safe and respectful environment. We respect intellectual property rights and follow DMCA guidelines.'
            }
          ]
        };
      case 'contact':
        return {
          title: 'Contact Us',
          icon: Mail,
          info: {
            email: 'renukagawande2022@gmail.com'
          }
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: type === 'about' ? 'About' : 'Contact', path: '/' },
            { label: content.title }
          ]}
        />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <content.icon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
          </div>

          {type === 'about' ? (
            <div className="prose max-w-none">
              {content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <a href={`mailto:${content.info.email}`} className="text-blue-600 hover:underline">
                        {content.info.email}
                      </a>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Information</h2>
            <div className="flex flex-wrap gap-4">
              {currentPath !== 'about' && (
                <Link to="/about" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                  About Us
                </Link>
              )}
              {currentPath !== 'contact' && (
                <Link to="/contact" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                  Contact Us
                </Link>
              )}
              <Link to="/privacy" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link to="/terms" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" />
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}