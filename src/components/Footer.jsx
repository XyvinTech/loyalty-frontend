
export default function Footer() {
  return (
    <div className=" text-grey py-4">
      <div className="container mx-auto px-4">
          <p className="text-center text-sm">
          &copy; {new Date().getFullYear()}
          <a
            href="https://continuityoman.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", paddingLeft: "10px" , paddingRight: "10px" }}
          >
            Continuity Oman.
          </a>
          All rights reserved.
        </p>
      </div>
    </div>
  );
}
