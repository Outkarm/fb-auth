export default function InputLayout({ labelVal, inputElId, inputType, handleOnChange, placeholderText = '' }) {
  return (
    <section className='tw-w-full tw-flex tw-flex-col tw-gap-1 tw-my-5'>
      <label htmlFor={inputElId} className='tw-capitalize'>
        {labelVal}
      </label>
      <input
        id={inputElId}
        type={inputType}
        onChange={handleOnChange}
        className='tw-bg-slate-500/30 tw-rounded-md tw-px-4 tw-py-2'
        placeholder={placeholderText}
      />
    </section>
  )
}
