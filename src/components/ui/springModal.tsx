"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Baby } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { toggleKidMode } from "@/store/features/userSlice";
import { toast } from "sonner";

export default function SpringModal({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const currentKidMode = useAppSelector(
    (state) => state.userData.kidMode
  );
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
          className="bg-neutral-900/40 p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "10deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "10deg" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="bg-gradient-to-br from-sky-600 to-blue-600 w-full max-w-lg rounded-lg p-6 text-white shadow-lg relative overflow-hidden cursor-default"
          >
            <Baby className="absolute opacity-10 -rotate-50 size-50 -bottom-8 -right-5 " />
            <div className="relative flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold tracking-tight text-2xl text-shadow-2xs">{`Turn ${
                  currentKidMode ? "Off" : "On"
                } Kid Mode?`}</h2>
                <p className="text-shadow-2xs text-lg font-light/loose">
                  Kid Mode is now turned{" "}
                  <strong>{currentKidMode ? "On" : "Off"}</strong>. It keeps the
                  experience tailored for kids when enabled. Are you sure?
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    dispatch(toggleKidMode());
                    setModalOpen(false);
                    toast.success(
                      `Kid mode turned ${currentKidMode ? "Off" : "On"}`
                    );
                  }}
                  className="bg-white rounded-sm text-sky-600 px-4 py-1.5 hover:bg-white/90 font-semibold cursor-pointer"
                >
                  Turn {`${currentKidMode ? "Off" : "On"}`}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-sm text-white px-4 py-1.5 font-semibold hover:bg-white/30 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
