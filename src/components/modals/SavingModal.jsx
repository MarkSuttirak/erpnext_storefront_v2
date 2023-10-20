import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import { FileCheck02 } from "@untitled-ui/icons-react"
import LoadingSpin from "../LoadingSpin"

export default function SavingModal({isSaving, isCompleted, setIsSaving, setIsCompleted}){
  return (
    <Transition.Root show={isSaving} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setIsSaving}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-8 py-6 text-left shadow-xl transition-all w-full max-w-md">
                {!isCompleted ? (
                  <div>
                    <LoadingSpin size={45} innerSize={35} color="#00B14F"/>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        กำลังบันทึกข้อมูล
                      </Dialog.Title>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='h-[45px] w-[45px] bg-[#00B14F] flex items-center justify-center rounded-full mx-auto'>
                      <FileCheck02 color='#FFFFFF' viewBox='0 0 22 22' width='24' height='24'/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        บันทึกที่อยู่ เรียบร้อยแล้ว
                      </Dialog.Title>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}