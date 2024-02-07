import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { PasswordInput } from "@/components/PasswordInput";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { loginUserFn } from "@/api/Auth";
import { Button } from "@/components/Button";
import WgsLogo from "@/assets/logo_wgs_fullBlack.svg";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const from = location.state?.prevLocation || "/";

  const store = useStore();

  //useMutation digunakan untuk melakukan operasi mutasi atau perubahan pada data, seperti membuat, memperbarui,
  //atau menghapus data di server (misalnya, melalui API)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginUser = useMutation({
    mutationFn: (userData) => loginUserFn(userData),

    onMutate: () => {
      store.setRequestLoading(true);
    },
    onSuccess: (res) => {
      console.log(res);
      store.setAuthUser(res);
      store.setUserToken(res.accessToken);
      store.setRequestLoading(false);
      reset();
      toast.success("You successfully logged in");
      navigate(from);
    },
    onError: (error) => {
      store.setRequestLoading(false);
      if (Array.isArray(error.response?.data?.mesage)) {
        error.forEach((el) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error(error.response?.data?.message, {
          position: "top-right",
        });
      }
    },
  });

  useEffect(() => {
    if (store.userToken) {
      navigate(from);
    }
  }, [store.userToken, navigate, from]);

  const onSubmitHandler = (values) => {
    loginUser.mutateAsync(values);
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center justify-center">
              <img className="h-24 w-40" src={WgsLogo} alt="Logo WGS" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Silakan masukan informasimu dibawah untuk masuk aplikasi
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <FormProvider {...useForm}>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <div className="flex flex-col">
                    <label className="mb-2" htmlFor="">
                      Email
                    </label>
                    <input
                      type="text"
                      className="rounded-md border h-12 outline-none appearance-none px-4"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Password</label>

                    <div className="relative mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="rounded-md border h-12 outline-none appearance-none px-4 w-full"
                        {...register("password", { required: true })}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePassword();
                        }}
                        className="focus:ring-primary-500 absolute top-1/2 -translate-y-1/2 right-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring"
                      >
                        {showPassword ? (
                          <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                        ) : (
                          <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="w-full px-5 py-3 rounded-lg border border-blue-500 bg-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      type="submit"
                      variant="solid"
                      color="blue"
                    >
                      Masuk
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full hidden w-0 flex-1 lg:block">
        {/* <img
					className='absolute inset-0 h-full w-full object-center'
					src={LoginBG}
					alt=''
				/> */}
        <div className="!h-dvh carousel rounded-s-3xl">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </div>
    </div>
  );
}
