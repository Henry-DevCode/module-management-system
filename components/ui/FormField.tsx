"use client"

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps {
  type: 'text' | 'dropdown';
  label: string;
  name: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
}

export function FormField({ type, label, name, placeholder, options, required }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    setIsOpen(false);
  };

  const selectedLabel = options?.find(opt => opt.value === selectedValue)?.label || placeholder || "Select...";

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      
      {type === 'text' ? (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          required={required} autoComplete="off"
          className="w-full h-12 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 transition-all focus:border-[#0D3B1A] focus:outline-none focus:ring-1 focus:ring-[#0D3B1A] hover:border-gray-300 placeholder:text-gray-400 shadow-sm"
        />
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Hidden input to ensure FormData works with Server Actions */}
          <input type="hidden" name={name} value={selectedValue} required={required} autoComplete="off" />
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full h-12 rounded-lg border bg-white px-4 text-left text-sm transition-all flex items-center justify-between shadow-sm focus:outline-none ${isOpen ? 'border-[#0D3B1A] ring-1 ring-[#0D3B1A]' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <span className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
              {selectedLabel}
            </span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && options && (
            <div className="absolute z-50 w-full mt-2 rounded-lg border border-gray-100 bg-white shadow-lg overflow-hidden transition-all">
              <div className="max-h-60 overflow-y-auto py-1">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${selectedValue === option.value ? 'bg-[#0D3B1A] text-white font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
