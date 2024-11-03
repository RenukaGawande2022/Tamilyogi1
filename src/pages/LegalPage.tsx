import React from 'react';
import { Navbar } from '../components/Navbar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Shield, Scale, Copyright, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'dmca';
}

export function LegalPage({ type }: LegalPageProps) {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: Shield,
          lastUpdated: 'March 15, 2024',
          content: [
            {
              title: 'Information Collection',
              text: 'We collect information when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or enter information on our site. When ordering or registering on our site, you may be asked to enter your name or email address.'
            },
            {
              title: 'Information Usage',
              text: 'Any information we collect from you may be used to personalize your experience, improve our website, improve customer service, process transactions, send periodic emails, and administer contests, promotions, surveys or other site features.'
            },
            {
              title: 'Information Protection',
              text: 'We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.'
            },
            {
              title: 'Cookies Usage',
              text: 'We use cookies to understand and save your preferences for future visits, keep track of advertisements, and compile aggregate data about site traffic and site interaction.'
            }
          ]
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: Scale,
          lastUpdated: 'March 15, 2024',
          content: [
            {
              title: 'Agreement to Terms',
              text: 'By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for compliance with any applicable local laws.'
            },
            {
              title: 'License',
              text: 'Permission is granted to temporarily download one copy of the materials (information or software) on Tamilyogi Movie\'s website for personal, non-commercial transitory viewing only.'
            },
            {
              title: 'User Content',
              text: 'Users may post reviews, comments, and other content as long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.'
            },
            {
              title: 'Service Modifications',
              text: 'We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.'
            }
          ]
        };
      case 'dmca':
        return {
          title: 'DMCA Notice & Takedown Policy',
          icon: Copyright,
          lastUpdated: 'March 15, 2024',
          content: [
            {
              title: 'Notification of Infringement',
              text: 'If you believe your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, you may notify our copyright agent. For your complaint to be valid under the DMCA, you must provide the following information when providing notice of the claimed copyright infringement: A description of the copyrighted work that you claim has been infringed; A description of where the material that you claim is infringing is located on the site.'
            },
            {
              title: 'Counter Notification',
              text: 'If you believe that your content that was removed is not infringing, or that you have the authorization to post and use the content from the copyright owner, you may send a counter-notice containing the following information: Your physical or electronic signature; Identification of the content that has been removed and where it was posted; A statement that you have a good faith belief that the content was removed in error.'
            },
            {
              title: 'Repeat Infringers',
              text: 'We maintain a policy of terminating the access privileges of users who repeatedly infringe the copyrights of others. If we receive multiple DMCA complaints about your conduct, we may terminate your account and your ability to use our services.'
            },
            {
              title: 'Contact Information',
              text: 'For any questions about this DMCA policy or to report copyright infringement, please contact us through our website\'s contact form or email us at the provided contact email.'
            }
          ]
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
            { label: 'Legal', path: '/' },
            { label: content.title }
          ]}
        />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <content.icon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-sm text-gray-600 mt-1">Last updated: {content.lastUpdated}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            {content.content.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Information</h2>
            <div className="flex flex-wrap gap-4">
              {currentPath !== 'privacy' && (
                <Link to="/privacy" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                  Privacy Policy
                </Link>
              )}
              {currentPath !== 'terms' && (
                <Link to="/terms" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                  Terms of Service
                </Link>
              )}
              {currentPath !== 'dmca' && (
                <Link to="/dmca" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                  DMCA Policy
                </Link>
              )}
              <Link to="/contact" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}