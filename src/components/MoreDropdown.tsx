"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavbar } from "@/hooks/useNavbar";
import { langugaes } from "@/lib/constants";

export default function MoreDropdown() {
  const [moreIsOpen, setMoreIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { tabOptions, handleLanguage } = useNavbar();
  const [isLanguageOptionOpen, setLanguageOptionOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreIsOpen(false);
      }
    };

    if (moreIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreIsOpen]);

  const handleMore = () => {
    setMoreIsOpen(!moreIsOpen);
    setLanguageOptionOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleMore}
        role="menu"
        className="md:flex items-center group relative hidden text-white gap-0.5 py-1 px-2 cursor-pointer hover:text-shadow-sm p-0"
      >
        More{" "}
        <span>
          {moreIsOpen ? (
            <ChevronUp className="size-4 mt-0.5" />
          ) : (
            <ChevronDown className="size-4 mt-0.5" />
          )}
        </span>
        <span className="absolute bottom-0 left-0 bg-white h-px w-full rounded-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>

      <AnimatePresence>
        {moreIsOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute hidden md:flex flex-col -bottom-62 right-0 bg-background p-2 w-40 rounded-md rounded-tr-none border"
          >
            {tabOptions.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  item.onClick();
                  if (item.id === "4") {
                    setLanguageOptionOpen(!isLanguageOptionOpen);
                  } else {
                    setLanguageOptionOpen(false);
                  }
                }}
                className="relative cursor-pointer"
              >
                {hovered === item.id && (
                  <motion.div
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 bg-foreground/10 rounded-md"
                    layoutId="hovered"
                  />
                )}
                <span className="flex items-center text-sm px-3 py-2 cursor-pointer tracking-tight gap-3 text-muted-foreground hover:text-foreground transition-all duration-300">
                  {<item.icon className="size-3.5" />} {item.name}
                </span>
                <AnimatePresence>
                  {item.id === "4" && moreIsOpen && isLanguageOptionOpen && (
                    <motion.ul
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onMouseLeave={() => setLanguageOptionOpen(false)}
                      className="absolute -left-25 top-1 bg-background border rounded-md rounded-tr-none p-2"
                    >
                      {langugaes.map((item) => (
                        <li
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLanguage(item.id);
                            setLanguageOptionOpen(false)
                          }}
                          onMouseEnter={() => setHovered(item.id)}
                          onMouseLeave={() => setHovered(null)}
                          className="px-3 py-1.5 flex items-center text-sm cursor-pointer tracking-tight gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 relative"
                        >
                          {item.langugae}

                          {hovered === item.id && (
                            <motion.div
                              layoutId="subgmenu"
                              className="absolute inset-0 bg-foreground/10 rounded-md"
                            />
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
