import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({title, menus, side = 'left'}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full justify-center text-[#424242] items-center gap-x-[6px] h-[30px]">
          {title}
          <ChevronDown />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute ${side === 'right' ? 'right-0' : 'left-0'} z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-[999]`}>
          <div className="py-1">
            {menus.map((m) => (
              <Menu.Item>
                {({ active }) => (
                  <Link to={m.link}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {m.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}