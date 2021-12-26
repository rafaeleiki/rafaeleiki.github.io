import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  
  return (
    <nav class="navbar is-transparent is-fixed-top pl-4">
      <div class="navbar-brand">
        <Link href="/">
          <a class="navbar-item">
            <Image
              src="/images/logo-new.webp"
              width={73}
              height={44}
            />
          </a>
        </Link>
        <div 
          className="navbar-burger" 
          onClick={() => setOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-menu ${ isOpen && 'is-active' }`}>
        <div className="navbar-end">
          <a class="navbar-item" href="https://github.com/rafaeleiki" target="_blank">
            <Image 
              src="/images/icons/github.svg" 
              width={28}
              height={28}
              className="p-1"
            />
            GitHub
          </a>
          <a class="navbar-item" href="https://www.linkedin.com/in/rafaelimamura/" target="_blank">
            <Image
              src="/images/icons/linkedin.svg"
              width={28}
              height={28}
              className="p-1"
            />
            LinkedIn
          </a>
        </div>
      </div>

      <style >{`
        .navbar {
          background: linear-gradient(45deg, #2b2523d6, #0f0c0b4f);
          font-weight: bold;
        }
      `}</style>
    </nav>
    );
  };
  