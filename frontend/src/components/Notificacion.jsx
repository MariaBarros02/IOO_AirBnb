import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const Notificacion = ( {notificacion} ) => {
    const {msg} = notificacion
    return (
        <div className="fixed top-4 right-4 z-50"> {/* Posición fija en la pantalla */}
            <Toast className="flex items-center p-4 w-full max-w-xs md:max-w-md  bg-white rounded-lg shadow">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-black ">{msg}</div>
                <ToastToggle />
            </Toast>
        </div>
    )
}

export default Notificacion