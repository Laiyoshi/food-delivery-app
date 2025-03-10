import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { FilterDropdownProps } from '@/app/types/types';

export function FilterDropdown<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: FilterDropdownProps<T>) {
  return (
    <div className="align-center  flex h-[40px] lg:w-[200px] w-full rounded border border-gray-300 pl-2.5">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="flex w-full">
            <ListboxButton className="flex w-full items-center justify-between px-2 text-ellipsis data-[focus]:bg-blue-500">
              <p className="max-w-[85%] overflow-clip text-nowrap overflow-ellipsis">{value}</p>
              <ChevronDownIcon
                className={`ml-auto w-5 transform text-gray-500 transition-transform duration-300 ${
                  open ? 'scale-y-[-1]' : ''
                }`}
              />
            </ListboxButton>

            <ListboxOptions
              anchor={{ to: 'bottom end', gap: '2px', offset: '1px' }}
              transition
              className="w-[200px] rounded border border-gray-300 bg-white text-center transition duration-300 ease-in data-[closed]:scale-100 data-[closed]:opacity-0"
              aria-hidden="true"
              style={{ left: 108 }}
            >
              <ListboxOption
                value={label}
                className="group flex cursor-default items-center px-4 py-3 text-center duration-300 hover:bg-gray-100"
              >
                {label}
              </ListboxOption>
              {options.map(option => (
                <ListboxOption
                  key={String(option)}
                  value={option}
                  className="group flex cursor-default items-center px-4 py-3 text-left duration-300 hover:bg-gray-100"
                >
                  {option}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
}
