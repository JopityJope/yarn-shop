import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__row">
          <div className="footer__col">
            <h2 className="heading-secondary">DROPS Yarns</h2>
            <div className="footer__links">
              <a className="footer__link" href="#">
                Work with us
              </a>
              <a className="footer__link" href="#">
                Privacy Policy
              </a>
              <a className="footer__link" href="#">
                About us
              </a>
            </div>
          </div>
        </div>

        <div className="footer__row footer__bot">
          <div className="footer__col">
            <p className="footer__copyright">
              &#169; DROPS Design by
              <a
                className="footer__copyright-link"
                href="https://github.com/JopityJope"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp;Josipa Tivanovac
              </a>
            </p>
          </div>
          <div className=" footer__col footer__icons">
            <a
              href="https://www.tiktok.com/@dropsdesign"
              target="_blank"
              rel="noreferrer"
            >
              <i className="footer__icon ri-tiktok-fill"></i>
            </a>
            <a
              href="https://www.instagram.com/dropsdesign/"
              target="blank"
              rel="noopener noreferrer"
            >
              <i className="footer__icon ri-instagram-line"></i>
            </a>

            <a
              href="https://www.facebook.com/Garnstudio.DROPS.design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="footer__icon ri-facebook-fill"></i>
            </a>
            <a
              href="https://www.pinterest.com/dropsdesign/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="footer__icon ri-pinterest-fill"></i>
            </a>
            <a
              href="https://twitter.com/Garnstudio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="footer__icon ri-twitter-fill"></i>
            </a>

            <a
              href="https://www.youtube.com/user/dropsdesign"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="footer__icon ri-youtube-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
