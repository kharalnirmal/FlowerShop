import { greatVibes } from "@/lib/font";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Choose() {
  return (
    <>
      <svg className="-top-[999px] -left-[999px] absolute w-0 h-0 clipppy">
        <defs>
          <clipPath id="clip-goey5" clipPathUnits={"objectBoundingBox"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
              fill="#D9D9D9"
            />
          </clipPath>
        </defs>
      </svg>
      <div
        className={cn(
          "flex lg:flex-row flex-col justify-center items-center mx-auto mt-20 lg:px-20 lg:w-6xl",
        )}
      >
        <div className={cn("lg:pr-8 w-2/3")}>
          <h1
            className={cn(
              "m-3 font-extrabold text-amber-400 text-4xl",
              greatVibes.className,
              "antialiased",
            )}
          >
            Why Choose us
          </h1>
          <p
            className={cn(
              "hidden lg:block w-full lg:w-[90%] text-gray-500 leading-5",
            )}
          >
            We are a team of passionate individuals dedicated to providing the
            best services to our customers. Our commitment to excellence and
            customer satisfaction sets us apart from the competition. We strive
            to exceed expectations and deliver exceptional results in everything
            we do. We believe in building long-term relationships with our
            clients based on trust, integrity, and mutual respect. Our team is
            committed to understanding your unique needs and providing
            personalized solutions that meet your goals. We are here to support
            you every step of the way and ensure that you have a positive
            experience with us. Choose us for our expertise, dedication, and
            commitment to your success.
          </p>
          <p
            className={cn(
              "lg:hidden block w-full lg:w-[90%] text-gray-500 leading-5",
            )}
          >
            We are a team of passionate individuals dedicated to providing the
            best services to our customers. Our commitment to excellence and
            customer satisfaction sets us apart from the competition. We strive
            to exceed expectations and deliver exceptional results in everything
            we do.
          </p>
        </div>

        <div className={cn("mt-7 lg:ml-20 w-1/3")}>
          <div className="relative">
            <figure className="hidden lg:block p-8 hover:p-4 rounded-xl transition-all duration-200">
              <div style={{ clipPath: "url(#clip-goey5)" }}>
                <Image
                  className="w-full object-cover aspect-square align-bottom"
                  src={"/flowers/gallery-4.jpg"}
                  alt="gallery-1"
                  width={200}
                  height={200}
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
