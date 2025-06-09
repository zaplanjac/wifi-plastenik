import React, { useState } from 'react';
import {
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
  CheckCircle,
  MessageCircle,
  Mail,
  ExternalLink
} from 'lucide-react';

interface SocialShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  url = window.location.href,
  title = "МОЈА БАШТА - Паметан систем за наводњавање",
  description = "Напредна контролна табла за климу и наводњавање са ESP32 технологијом. Аутоматско управљање баштом са реалним праћењем сензора."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    url,
    title,
    description
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.title + ' - ' + shareData.description)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title + ' - ' + shareData.description)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'bg-blue-700 hover:bg-blue-800',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-600 hover:bg-green-700',
      shareUrl: `https://wa.me/?text=${encodeURIComponent(shareData.title + ' - ' + shareData.description + ' ' + shareData.url)}`
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-gray-600 hover:bg-gray-700',
      shareUrl: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.description + '\n\n' + shareData.url)}`
    }
  ];

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    window.open(platform.shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url
        });
        setIsOpen(false);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Подели</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share menu */}
          <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl z-50 min-w-80">
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">Подели систем</h3>
              <p className="text-white/70 text-sm">{shareData.description}</p>
            </div>

            {/* Social platforms */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`flex items-center gap-2 ${platform.color} text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium`}
                >
                  {platform.icon}
                  {platform.name}
                </button>
              ))}
            </div>

            {/* Copy link */}
            <div className="border-t border-white/20 pt-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Копирано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Копирај линк</span>
                  </>
                )}
              </button>
            </div>

            {/* Native share (mobile) */}
            {navigator.share && (
              <div className="mt-2">
                <button
                  onClick={handleNativeShare}
                  className="flex items-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Подели преко система
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShareButton;