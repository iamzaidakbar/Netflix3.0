import logo from "../../assets/logo/netflix-logo.png";
import { Github, Instagram, Linkedin, Facebook } from "react-bootstrap-icons";
import "../../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social">
        <span className="links">
          <a
            target="_blank"
            href="https://www.facebook.com/zaidakbarwani/"
            className="fb"
          >
            <Facebook color="white" size={25} />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/1amzaidakbar/"
            className="insta"
          >
            <Instagram color="white" size={25} />
          </a>
          <a
            target="_blank"
            href="https://github.com/iamzaidakbar"
            className="github"
          >
            <Github color="white" size={25} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/zaidakbar/"
            className="linkedin"
          >
            <Linkedin color="white" size={25} />
          </a>
        </span>
        <span className="creator">
          created by <i>Zaid Akbar</i>
        </span>
      </div>
      <span className="line"></span>
      <div className="netflix">
        <img src={logo} width={200} />
      </div>
    </div>
  );
};
export default Footer;
