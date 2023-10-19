export default function CheckoutPayment(){
  const handleClickBack = () => {
    setCurrentPage('checkout')
  }

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white'>
        <button onClick={handleClickBack} type="button">
          <ArrowLeft />
        </button>
        เลือกช่องทางชำระ
      </header>
      <main>
        <label htmlFor="transfer" className='flex justify-between p-5 w-full border-b border-b-[#E3E3E3] items-center'>
          <div className='text-left'>
            <h2 className='text-[#333333] text-sm font-bold'>โอนเงินเข้าบัญชี</h2>
            <p className='text-[#969696] text-xs mt-[6px]'>
              <img src={banks} />
            </p>
          </div>
          <div>
            <input type="radio" id="transfer" name="payment-method" className='payment-check' checked onChange={formik.handleChange}/>
            <span className='payment-radios'></span>
          </div>
        </label>
        <label htmlFor="credit" className='flex justify-between p-5 w-full border-b border-b-[#E3E3E3] items-center'>
          <div className='text-left'>
            <h2 className='text-[#333333] text-sm font-bold'>Credit Card</h2>
            <p className='text-[#969696] text-xs flex items-center gap-x-3'>
              <img src={visaIcon} />
              5689 .... 1234
            </p>
          </div>
          <div>
            <input type="radio" id="credit" name="payment-method" className='payment-check' onChange={formik.handleChange}/>
            <span className='payment-radios'></span>
          </div>
        </label>

        <div className='p-5'>
          <button className='bg-[#F4F4F4] p-5 rounded-[7px] w-full' onClick={clickToAddCard}>
            <div className='flex gap-x-[7px] justify-center'>
              <MarkerPin01 />
              เพิ่มบัตรเครดิตการ์ด
            </div>
          </button>
        </div>
      </main>
      <footer className='p-5 absolute bottom-0 w-full'>
        <button onClick={formik.handleSubmit} type='submit' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111]`}>ยืนยันการเลือก</button>
      </footer>
    </>
  )
}