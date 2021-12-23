import Image from 'next/image';

export default function Navbar() {
  
  return (
    <nav class="navbar is-transparent is-fixed-top pl-4">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <Image
            src="/images/logo.svg"
            width={103}
            height={28}
          />
        </a>
        <div className="navbar-burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style >{`
        .navbar {
          background: linear-gradient(45deg, #2b2523d6, #0f0c0b4f);
        }
      `}</style>
    </nav>
    );
  };
  