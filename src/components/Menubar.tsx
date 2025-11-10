"use client";
import { MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavbar } from "@/hooks/useNavbar";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

export default function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLanguageOptionOpen, setLanguageOptionOpen] =
    useState<boolean>(false);
  const { handleLanguage, mobileOptions, langugaes } = useNavbar();
  const currentKidMode = useAppSelector((state) => state.userData.kidMode);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setLanguageOptionOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <MenuIcon
        className="size-5 text-white"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setLanguageOptionOpen(false);
        }}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-7 right-1 bg-background flex flex-col rounded-md rounded-tr-none hover:text-foreground px-3 py-2 cursor-pointer border z-50"
          >
            {mobileOptions.map((item) => (
              <li
                onClick={() => {
                  if (item.id === "4") {
                    setLanguageOptionOpen(!isLanguageOptionOpen);
                  } else {
                    setLanguageOptionOpen(false);
                  }
                  item.onClick();
                }}
                key={item.id}
                className="relative"
              >
                <span
                  className={cn(
                    "flex items-center gap-3 text-muted-foreground whitespace-nowrap active:text-foreground hover:text-foreground w-full pr-4 pl-2 py-1",
                    item.id === "8" && currentKidMode && "text-sky-500"
                  )}
                >
                  {<item.icon className="size-3.5" />}
                  {item.name}
                </span>

                <AnimatePresence>
                  {isLanguageOptionOpen && item.id === "4" && isMenuOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bg-background border rounded-md rounded-tr-none -left-26 top-0"
                    >
                      {langugaes.map((item) => (
                        <li
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLanguageOptionOpen(false);
                            handleLanguage(item.id);
                          }}
                          className="px-4 py-1 text-muted-foreground whitespace-nowrap active:text-foreground hover:text-foreground"
                        >
                          {item.langugae}
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
