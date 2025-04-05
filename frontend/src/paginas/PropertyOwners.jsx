import HeaderPrincipal from "../layout/HeaderPrincipal"
import Footer from "../layout/Footer"
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Space from "../components/Space";

const PropertyOwners = () => {
    return (
        <>
            <HeaderPrincipal
                imagen="7"
            />

            <section className=" bg-gray-200 py-10">
                <div className="w-10/12 m-auto grid grid-cols-1 gap-8 items-center md:grid-cols-3">
                    <img className="rounded-full m-auto" src="/images/image_29.jpg" alt="guests" />
                    <div className=" text-center md:col-span-2">
                        <h2 className="text-5xl font-bold uppercase mb-3  lg:text-6xl">Welcome, <span className="text-rose-600">Propety Owners!</span></h2>
                        <p className="">We partner with you to maximize the potential of your real estate investments. Our platform offers unparalleled opportunities to list your properties, ensuring high visibility and optimal occupancy rates. We are committed to providing comprehensive support and services to make your experience seamless and profitable. Join our network of satisfied property owners and experience the difference our expertise and commitment can make. List your property with us today and unlock its full potential! </p>
                    </div>

                </div>
            </section>


            <section className="">

                <div className="grid grid-cols-1 lg:grid-cols-3 " >

                    <div className="col-span-2 py-10 w-10/12 m-auto">
                        <h2 className="text-5xl font-bold my-5 uppercase">Unlock the <span className="text-cyan-600">Full Potential</span> of Your Property with Our  <span
                            className="text-rose-600">Expert Management </span>Services</h2>
                        <div>
                            <Timeline>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Introduction to Our Services</Timeline.Time>
                                        <Timeline.Title>Maximized Occupancy Rates</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            We leverage advanced marketing strategies and a vast network to ensure your property reaches a broad audience. Our platform attracts a diverse range of guests, from tourists to business travelers, guaranteeing high occupancy rates throughout the year. By listing your property with us, you can rest assured that it will be in high demand.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Service Setup</Timeline.Time>
                                        <Timeline.Title>Comprehensive Property Management</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Our dedicated property management team takes care of every detail, from guest communication to maintenance and cleaning services. We conduct regular inspections to maintain the highest standards, ensuring your property remains in pristine condition. This allows you to enjoy the benefits of rental income without the hassle of day-to-day management.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Maximizing Your Earnings</Timeline.Time>
                                        <Timeline.Title>Competitive Earnings</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Our dynamic pricing models and expert market analysis help you achieve the best possible returns on your investment. We continuously monitor market trends and adjust pricing to maximize your earnings while staying competitive. Additionally, our transparent fee structure ensures you understand exactly how your income is calculated, providing peace of mind and financial clarity.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Ongoing Support</Timeline.Time>
                                        <Timeline.Title>Expert Property Management</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Our experienced property management team takes care of every detail, from guest check-in and check-out to regular maintenance and cleaning. We ensure your property is always in top condition, providing a seamless experience for both you and your guests. Our team is available 24/7 to handle any issues that may arise, giving you peace of mind.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            </Timeline>
                            <section className="banner banner--bg_2 ">
                                <div className="bg-zinc-900 bg-opacity-70 text-white py-20 flex flex-col justify-center items-center text-center">
                                    <p className="text-xl lg:text-3xl font-bold uppercase w-8/12 m-auto ">HAVE YOU LIKED THE BENEFITS AND ADVANTAGES WE OFFER? CONTACT US TO BECOME PART OF OUR COMPANY.</p>
                                    <Button className="mt-5 bg-zinc-950" color="dark" size="lg" href="mailto:admin@marketoakconsult.com" >CONTACT US</Button>
                                </div>
                            </section>

                        </div>

                    </div>
                    <img src="/images/image_30.jpg" alt="..." className="h-full object-cover" />
                </div>

            </section>
            <Footer />
        </>
    )
}

export default PropertyOwners