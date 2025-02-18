import Link from "next/link";

const AuthLink = ({ text, linkText, linkHref }) => {
  return (
    <div className="pt-2">
      <p className="text-sm text-gray-400 text-center">
        {text}{' '}
        <Link href={linkHref} className="font-medium text-white hover:text-gray-200">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthLink;
