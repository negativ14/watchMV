"use client";
import Image from "next/image";
import coverImage from "@/assets/images/netflix.jpg";
import deadpool from "@/assets/images/dp.jpg";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authSchema, validateCredentials } from "@/lib/validations";
import { useRouter } from "next/navigation";
import cloud from "@/assets/images/cloud.jpg";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/features/userSlice";
import {
  setFavorites,
  setSearchHistory,
  setWatchHistory,
  setWatchLater,
} from "@/store/features/userLibrarySlice";

type CurrentFormType = "signin" | "signup";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentForm, setCurrentForm] = useState<CurrentFormType>("signin");
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, password };
    const parsedFormData = authSchema.safeParse(formData);

    if (!parsedFormData.success) {
      const errorMessages = parsedFormData.error.issues[0].message;
      toast.error(errorMessages);
      return;
    }
    const parsedEmail = parsedFormData.data?.email;
    const parsedPassword = parsedFormData.data?.password;

    const response = validateCredentials(
      parsedEmail,
      parsedPassword,
      currentForm
    );

    if (response?.success) {
      const user = {
        email: response.user.email,
        password: response.user.password,
        kidMode: response.user.kidMode,
        language: response.user.language,
      };
      dispatch(setUser(user));
      dispatch(setWatchLater(response.user.watchLater));
      dispatch(setWatchHistory(response.user.watchHistory));
      dispatch(setSearchHistory(response.user.searchHistory));
      dispatch(setFavorites(response.user.favorites));

      push("/");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute h-full w-full inset-0 z-0">
        <Image
          src={coverImage}
          alt="cover-image"
          fill
          className="object-cover pointer-events-none"
          sizes="w-auto h-full"
        />
        <div className="h-full w-full bg-black opacity-70"></div>
      </div>

      <div className="h-screen w-screen relative flex items-center">
        <div className="w-full h-full md:h-11/12 border-y border-t-movie-primary border-b-tv-primary border-t border-b md:px-10">
          <div className="max-w-7xl mx-auto h-full relative">
            <div className="absolute left-px inset-y-0 w-px bg-gradient-to-b from-movie-primary to-tv-primary" />
            <div className="absolute right-px inset-y-0 w-px bg-gradient-to-b from-movie-primary to-tv-primary" />

            <div className="absolute inset-x-0 h-10 -top-10">
              <div className="absolute left-px w-px h-10 bg-gradient-to-b from-transparent to-movie-primary" />
              <div className="absolute right-px w-px h-10 bg-gradient-to-b from-transparent to-movie-primary" />
            </div>
            <div className="absolute inset-x-0 h-10 -bottom-10">
              <div className="absolute left-px w-px h-10 bg-gradient-to-b from-tv-primary to-transparent" />
              <div className="absolute right-px w-px h-10 bg-gradient-to-b from-tv-primary to-transparent" />
            </div>

            <div className="relative z-0 grid md:grid-cols-2 h-full w-full px-0.5">
              <div className="h-full w-full relative hidden md:block">
                <Image
                  src={deadpool}
                  alt="deadpool login img"
                  className="h-full w-auto object-cover"
                />
              </div>

              <div className="bg-white h-full w-full relative flex justify-center items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-movie-primary to-tv-primary opacity-80" />
                <Image
                  src={cloud}
                  alt="clouds"
                  className="absolute object-cover -top-10 mask-b-from-0%"
                />

                <div className="z-0 relative w-full md:w-80">
                  <h1 className="text-5xl font-bold text-foreground text-shadow-md text-center pb-8">
                    watch<span className="text-movie-primary">M</span>
                    <span className="text-tv-primary">V</span>
                  </h1>
                  <form
                    onSubmit={handleAuth}
                    className="flex flex-col gap-6 p-4 md:p-0"
                  >
                    <div className="flex flex-col gap-1">
                      <label htmlFor="email" className="text-black">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className="shadow-md text-black"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="password" className="text-black">
                        Password
                      </label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className="shadow-md text-black"
                      />
                    </div>

                    <Button type="submit" className="w-full cursor-pointer">
                      {currentForm === "signin" ? "Sign In" : "Sign Up"}
                    </Button>
                  </form>

                  <div className="flex items-center text-sm ml-4 md:ml-0 pt-1 pl-px  text-black">
                    <h2>
                      <span>
                        {currentForm === "signin" ? "Create" : "Have"}
                      </span>{" "}
                      an account?
                    </h2>
                    <Button
                      variant={"link"}
                      className="p-1.5 text-black cursor-pointer"
                      onClick={() =>
                        currentForm === "signin"
                          ? setCurrentForm("signup")
                          : setCurrentForm("signin")
                      }
                    >
                      {currentForm === "signin" ? "Sign Up" : "Sign In"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
