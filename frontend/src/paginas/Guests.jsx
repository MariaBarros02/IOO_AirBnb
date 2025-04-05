import HeaderPrincipal from "../layout/HeaderPrincipal"
import Space from "../components/Space"
import Footer from "../layout/Footer"
import { Carousel, Card } from "flowbite-react"

const Guests = () => {
  return (
    <>
      <HeaderPrincipal
        imagen="1"
      />
      <section className=" bg-gray-200 py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 gap-8 items-center md:grid-cols-3">
          <img className="rounded-full m-auto" src="/images/image_3.jpg" alt="guests" />
          <div className=" text-center md:col-span-2">
            <h2 className="text-5xl font-bold uppercase mb-3  lg:text-6xl">Welcome, <span className="text-cyan-600">Guests!</span></h2>
            <p className="">We are delighted to offer
              you the perfect home away from home. Whether you're here for business, pleasure, or a bit of
              both,
              our properties provide you with unparalleled comfort and convenience.
              At Marketoak, we are delighted to offer you the perfect home away from home. Whether you're
              here for business, pleasure, or a bit of both, our properties provide you with unparalleled
              comfort
              and convenience.Ready to experience the best in short-term stays? Take a look at our properties
              here
              and book your stay today!
            </p>
          </div>

        </div>
      </section>
      <section >
        <div className="guest__carousel banner banner--bg_4 ">
          <Carousel className="bg-zinc-900 bg-opacity-50">
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_25.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Pet-Friendly Stays: Bring your furry friends along for a perfect getaway</h5>
                <p className="mb-3 text-xs font-normal md:text-base">We welcome pets at our properties, ensuring that your whole family, including your four-legged members, can enjoy a relaxing and enjoyable stay. Rest easy knowing your pets are as comfortable as you are.</p>
              </div>
            </div>
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_26.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Spacious and Modern Design: Enjoy the perfect blend of comfort and style</h5>
                <p className="mb-3 text-xs font-normal md:text-base">Our property boasts a spacious and modern design, providing a perfect blend of comfort and style. With open-concept living areas, sleek furnishings, and high-quality finishes, you can relax and unwind in a beautifully designed space that feels like home.</p>
              </div>
            </div>
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_27.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Cozy Bedrooms: Sleep soundly in well-appointed rooms designed for relax</h5>
                <p className="mb-3 text-xs font-normal md:text-base">Our property features cozy and comfortable bedrooms equipped with high-quality bedding and thoughtful touches to ensure a restful night's sleep. Whether you're here for a short stay or an extended visit, you'll appreciate the tranquil ambiance and attention to detail in every room.</p>
              </div>
            </div>
          </Carousel>
        </div>


      </section>


      <section className="">

        <div className="grid grid-cols-1 lg:grid-cols-3 " >
          <img src="/images/image_7.jpg" alt="..." className="h-full object-cover" />
          <div className="col-span-2 py-10 w-10/12 m-auto">
            <h2 className="text-5xl font-bold my-5 uppercase">Enjoy Unmatched <span className="text-cyan-600"> Comfort</span> and <span
              className="text-rose-600">Convenience</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-location-pin" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 18l-2 -4l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.901 8.034" />
                  <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
                  <path d="M19 18v.01" />
                </svg>
                <h3 className="font-bold uppercase text-2xl mb-3">Prime Locations</h3>
                <p className="text-sm">
                  Our properties are situated in the best areas, so you're always close to
                  the action. Whether you're looking to explore vibrant city centers, relax on picturesque
                  beaches, or experience the charm of quaint neighborhoods, our locations put you right where
                  you want to be. Enjoy easy access to popular attractions, dining hotspots, shopping centers,
                  and public transportation. You'll never miss a beat with our strategically placed properties
                  that make it convenient for you to enjoy everything the area has to offer.
                </p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-router" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M17 17l0 .01" />
                  <path d="M13 17l0 .01" />
                  <path d="M15 13l0 -2" />
                  <path d="M11.75 8.75a4 4 0 0 1 6.5 0" />
                  <path d="M8.5 6.5a8 8 0 0 1 13 0" />
                </svg>
                <h3 className="font-bold uppercase text-2xl my-5">Top-notch Amenities</h3>
                <p className="text-sm">
                  Enjoy high-speed Wi-Fi, fully equipped kitchens, comfortable beds, and
                  more. We understand that the little things can make a big difference in your stay.
                  Connect seamlessly with our high-speed Wi-Fi, perfect for both work and entertainment.
                  Prepare your favorite meals in our modern kitchens equipped with all the necessary
                  appliances and utensils. Rest easy on our plush beds designed for a restful night's sleep.
                </p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar-check" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h16" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
                <h3 className="font-bold uppercase text-2xl my-5" >Flexibility</h3>
                <p className="text-sm">
                  We offer flexible booking options to suit your schedule. Whether you require a short stay
                  for a few days or an extended stay for several weeks, we have options that cater
                  to your unique needs. Our user-friendly booking system makes it easy to reserve your stay,
                  modify your dates, or extend your visit with just a few clicks. Plus, our competitive
                  pricing and special offers ensure that you get the best value for your money.
                </p>
              </div>

              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-heart" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
                  <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
                </svg>
                <h3 className="font-bold uppercase text-2xl my-5">Personalized Service</h3>
                <p className="text-sm">
                  Our friendly staff is always here to assist you and ensure you have a pleasant stay. We take
                  pride in offering personalized service that goes above and beyond. From the moment you book
                  your stay, our dedicated team is available to answer your questions, provide local insights,
                  and assist with any special requests. We're here to make your stay as comfortable
                  and enjoyable as possible.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>


      <Footer />
    </>
  )
}

export default Guests