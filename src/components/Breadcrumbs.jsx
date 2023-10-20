import { Link } from "react-router-dom";

export default function Breadcrumbs({pages}) {
  return (
    <nav className="hidden lg:flex mb-10" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-3">
        <Link
          to='/'
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
          aria-current='home'
        >
          Home
        </Link>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={page.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}